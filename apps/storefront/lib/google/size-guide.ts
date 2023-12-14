const CM2INCHES = 0.393701;
const L2GAL = 0.264172;

const APPARELS = ['MAN', 'WOMAN'];
const ACCESSORIES = 'ACCESSORIES';
const COUNTRIES = ['EU', 'UK', 'US (M)', 'US (W)', 'JP'];

const FRAME_BAGS = 'FRAME-BAGS';
const HANDLEBAR_PACK = 'HANDLEBAR-PACK';
const SADDLE_PACK = 'SADDLE-PACK';
const DOT_SIGN = '&dot;';

const ONE_SIZE = 'ONE SIZE';

const KEEP_0_FIXED = 1;
const KEEP_2_FIXED = 100;

interface KeyValueMap {
    [key: string]: string;
}

interface UnitData {
    [part: string]: KeyValueMap | string;
}
interface CategoryData {
    [unit: string]: UnitData
}

interface GenderAccessorData {
    [category: string]: CategoryData
}

export interface TableData {
    [gender: string]: GenderAccessorData
}

const transformCM2Inches = (val: string) => {
    return (
        Math.round(parseFloat(val) * CM2INCHES * KEEP_0_FIXED) / KEEP_0_FIXED
    );
};

const transformL2Gal = (val: string) => {
    return Math.round(parseFloat(val) * L2GAL * KEEP_2_FIXED) / KEEP_2_FIXED;
};

const transformCMRange2Inches = (val: string) => {
    if (!filterValidCellValue(val)) {
        return '';
    }
    const arr:string[] = val.split('-');
    let newVal: string = val;
    if (arr.length > 1) {
        newVal = arr
            .map((d) => {
                return transformCM2Inches(d);
            })
            .join('-');
    } else {
        newVal = val[0] + transformCM2Inches(val.substring(1));
    }
    return newVal;
};

const filterTransformCM2Inches = (val: string) => {
    if (!filterValidCellValue(val)) {
        return '';
    }
    return transformCM2Inches(val);
};

const filterTransformL2Gal = (val: string) => {
    if (!filterValidCellValue(val)) {
        return '';
    }
    return transformL2Gal(val);
};

const filterValidCellValue = (val: string) => {
    if (val.trim() === 'X') {
        return '';
    }
    return val.trim().replaceAll(DOT_SIGN, '.');
};

const normaliseKey = (key: string) => {
    return key.toUpperCase().trim().replaceAll(' ', '-');
};

export const fetchSheetsSizeData = async () => {
    const response = await fetch(`/api/size-guide`);
    return await response.json();
};

function setDataWithPathValue(data: TableData, path: string, value: string) {
    if (!path) {
        return;
    }
    const paths: string[] = path.split('.');
    let newData: { [key:string]: any } = data;
    for (let i = 0; i < paths.length; i++) {
        const key: string = paths[i];
        if (i < paths.length - 1) {
            if (!newData[key]) {
                newData[key] = {};
            }
            newData = newData[key];
        } else {
            newData[key] = value;
        }
    }
}

export const transformSizeGuide = (dataValues: string[][]) => {
    const headers: string[] = dataValues[0];
    const rest: string[][] = dataValues.slice(1).filter((v) => {
        return true;
    });

    let prevGender: string = '';
    let prevCategory: string = '';
    let mapping: TableData = {};
    const startSizeSeparatorIndex = 5;
    const headersRest: string[] = headers.slice(startSizeSeparatorIndex);
    for (let ri = 0; ri < rest.length; ri++) {
        const row: string[] = rest[ri];
        const rowRest: string[] = row.slice(startSizeSeparatorIndex);
        let gender: string = normaliseKey(row[0] || prevGender);
        const category: string = normaliseKey(row[1] || prevCategory);
        if (gender.includes(ACCESSORIES)) {
            gender = ACCESSORIES;
        }
        const unit: string = row[3];
        let size: string = row[4];
        let refer: string = row[5];
        for (let hi = 0; hi < headersRest.length; hi++) {
            const key: string = headersRest[hi];
            const val: string = rowRest[hi];
            // filter valid data for man and woman
            const notValid: boolean = APPARELS.includes(gender) && (hi <= 0 || hi > 7);
            if (notValid) {
                continue;
            }

            if (val && val.trim() && key && key.trim()) {
                let newSize: string = size;
                if (refer) {
                    newSize = `${refer} ${size}`;
                }
                const keys: string[] = [gender, category, 'CM', newSize, key]
                    .filter((v) => !!v)
                    .map((v) => v.replaceAll('.', DOT_SIGN));
                const path: string = keys.join('.');
                const filterVal: string = filterValidCellValue(val);
                setDataWithPathValue(mapping, path, filterVal);

                const inKeys: string[] = [gender, category, 'IN', newSize, key]
                    .filter((v) => !!v)
                    .map((v) => v.replaceAll('.', DOT_SIGN));

                const inPath: string = inKeys.join('.');
                if (unit === 'CM') {
                    const inVal: string = transformCMRange2Inches(filterVal);
                    setDataWithPathValue(mapping, inPath, inVal);
                } else {
                    // Not CM
                    setDataWithPathValue(mapping, inPath, filterVal);
                }
            }
        }
        prevGender = gender;
        prevCategory = category;
    }
    return mapping;
};

const readFrameBags = (mappingGender: GenderAccessorData, catchCm: boolean) => {
    const groups: string[] = [HANDLEBAR_PACK, SADDLE_PACK, FRAME_BAGS];
    let sizeArr: CategoryData[] = groups.map((key) => mappingGender[key]);
    let tableData: string[][] = [];
    sizeArr.map((v, idx) => {
        let headerArr: string[] = ['Dimensions'];
        const columnName = groups[idx]
            .split('-')
            .map(
                (s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase()
            )
            .join(' ');
        let rowArr = [columnName];

        Object.keys(v['CM']).map((s) => {
            const sepratorIndex = s.lastIndexOf(' ');
            const unitVal = s.substring(0, sepratorIndex);
            const unit = s.substring(sepratorIndex + 1);
            headerArr.push(unit.charAt(0) + unit.substring(1).toLowerCase());

            if (unitVal.includes(',') && unitVal.includes('=')) {
                // Front= 5, Downtube= 14, Rear= 7
                const inCellValue = unitVal
                    .split(',')
                    .map((s) => {
                        const [uK, uV] = s.split('=');
                        return `${uK}= ${filterTransformCM2Inches(uV.trim())}`;
                    })
                    .join(',');
                const cellValue = catchCm
                    ? filterValidCellValue(unitVal)
                    : inCellValue;
                rowArr.push(cellValue);
            } else if (unitVal.endsWith('L')) {
                // 9L
                const cellValue = catchCm
                    ? filterValidCellValue(unitVal)
                    : filterTransformL2Gal(
                          unitVal.substring(0, unitVal.length - 1)
                      ) + ' GAL';
                rowArr.push(cellValue);
            } else {
                const cellValue = catchCm
                    ? filterValidCellValue(unitVal)
                    : `${filterTransformCM2Inches(unitVal)}`;
                rowArr.push(cellValue);
            }
        });
        if (tableData.length <= 0) {
            tableData.push(headerArr);
        }
        tableData.push(rowArr);
    });
    return tableData;
};

export const getSizeGuide = (
    mapping: TableData,
    gender: string,
    categories: string[],
    unit: string
) => {
    const catchCm:boolean = unit === 'CM';
    const normaliseGender:string = normaliseKey(gender);
    if (![...APPARELS, ACCESSORIES].includes(normaliseGender)) {
        return [];
    }
    const mappingGender: GenderAccessorData | undefined = Object.entries(mapping).find(([key]) => {
        return normaliseGender === key;
    })?.[1];

    if(!mappingGender){
        return []
    }
    const normalsizeCategory:string = normaliseKey(categories[0]);
    if (normalsizeCategory === FRAME_BAGS) {
        return readFrameBags(mappingGender, catchCm);
    }

    let mappingCategory: CategoryData | undefined = mappingGender[normalsizeCategory];
    if (!mappingCategory) {
        // get equal first, then filter includes
        for (let ci = 0; ci < categories.length; ci++) {
            const curCategory = normaliseKey(categories[ci]);
            mappingCategory = Object.entries(mappingGender).find(([key]) => {
                if (key.includes('&') || key.includes(',')) {
                    let newKeys: string[] = key
                        .replaceAll('-', ' ')
                        .split('&')
                        .map((s) => s.trim().replaceAll(' ', '-'));
                    return newKeys.some((s) => curCategory.includes(s));
                } else {
                    return curCategory.includes(key);
                }
            })?.[1];
            if (mappingCategory) {
                break;
            }
        }
    }
    if (!mappingCategory) {
        return [];
    }
    const data = mappingCategory[unit];
    if (!data || (data[ONE_SIZE] && data[ONE_SIZE] instanceof String &&  data[ONE_SIZE].toUpperCase() === 'TRUE')) {
        return [];
    }

    let tableData:string[][] = [];
    const headers = ['Size'];
    let referIndex: null | number = null;
    const unitKeys = Object.keys(Object.values(data)[0]);
    for (let ki = 0; ki < unitKeys.length; ki++) {
        const sizeUnit = unitKeys[ki];
        if (sizeUnit === 'Refer') {
            referIndex = ki;
            continue;
        }
        headers.push(sizeUnit);
    }
    tableData.push(headers);
    for (const [k, v] of Object.entries(data)) {
        let sizeUnit = catchCm ? '(cm)' : '(in)';
        let headerK = k.charAt(0).toUpperCase() + k.substring(1).toLowerCase();
        if (COUNTRIES.includes(k)) {
            sizeUnit = '';
            headerK = k;
        }
        let row: string[] = [`${headerK} ${sizeUnit}`];
        const unitValues: string[] = Object.values(v);
        for (let ui = 0; ui < unitValues.length; ui++) {
            const size = unitValues[ui];
            if (referIndex != null && ui === referIndex) {
                continue;
            }
            row.push(size);
        }
        tableData.push(row);
    }
    return tableData;
};
