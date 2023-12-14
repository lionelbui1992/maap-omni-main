import React from 'react';

const AntiOdour = ({ ...props }) => {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.59346 14.1991C5.59346 12.4361 7.02874 10.9981 8.79603 10.9981H8.81678C9.07271 11.1813 9.38397 11.2953 9.72291 11.2953C10.0618 11.2953 10.3731 11.1847 10.629 10.9981H12.3929C14.5994 10.9981 16.3943 9.20399 16.3943 6.99856C16.3943 5.23559 17.8296 3.79757 19.5969 3.79757H22.8652C22.3291 3.49683 21.7723 3.2272 21.1947 2.99905H19.5969C17.3904 2.99905 15.5954 4.79313 15.5954 6.99856C15.5954 8.76152 14.1602 10.1995 12.3929 10.1995H11.1997C11.2446 10.0544 11.2758 9.90226 11.2758 9.73979C11.2758 9.53238 11.2343 9.33535 11.1582 9.15214C13.0949 8.8756 14.5925 7.20942 14.5925 5.19757C14.5925 3.63164 15.7234 2.32843 17.2106 2.05189C16.8094 2.01732 16.4047 1.99658 15.9932 1.99658C15.7891 1.99658 15.5851 2.0035 15.381 2.01041C14.4161 2.73979 13.7901 3.89436 13.7901 5.19411C13.7901 6.95708 12.3548 8.3951 10.5875 8.3951H10.4907C10.2624 8.26374 9.99959 8.18078 9.71599 8.18078C9.43239 8.18078 9.16955 8.26374 8.94129 8.3951H6.98724C4.78071 8.3951 2.98575 10.1892 2.98575 12.3946C2.98575 13.2761 2.62953 14.0746 2.05196 14.6519C2.01737 15.0079 2.00008 15.364 1.99316 15.727C3.07222 15.0114 3.78812 13.7842 3.78812 12.3946C3.78812 10.6316 5.2234 9.19362 6.99069 9.19362H8.26688C8.20463 9.363 8.16312 9.54276 8.16312 9.73634C8.16312 9.91263 8.19771 10.0786 8.25305 10.2341C6.29899 10.4968 4.78763 12.1699 4.78763 14.1921C4.78763 15.7961 3.59791 17.127 2.05196 17.3551C2.07617 17.6213 2.11075 17.8874 2.1488 18.1467C4.08901 17.8702 5.58654 16.204 5.58654 14.1921L5.59346 14.1991ZM7.39534 16C7.39534 15.7062 7.43684 15.4262 7.51293 15.1566C7.69969 15.2361 7.90374 15.2776 8.11816 15.2776C8.97933 15.2776 9.67449 14.5828 9.67449 13.722C9.67449 13.4593 9.60532 13.2173 9.49119 12.9995C9.83704 12.8716 10.2106 12.7991 10.6014 12.7991H14.2017C16.4082 12.7991 18.2031 11.005 18.2031 8.79955C18.2031 7.03658 19.6384 5.59856 21.4057 5.59856H25.006C25.1236 5.59856 25.2412 5.59165 25.3553 5.58127C25.051 5.30819 24.7328 5.04547 24.4042 4.80004H21.4023C19.1957 4.80004 17.4008 6.59411 17.4008 8.79955C17.4008 10.5625 15.9655 12.0005 14.1982 12.0005H10.5979C9.98921 12.0005 9.4151 12.1423 8.89633 12.3842C8.66461 12.2494 8.40176 12.1665 8.11471 12.1665C7.25354 12.1665 6.55838 12.8613 6.55838 13.722C6.55838 14.0573 6.6656 14.365 6.84544 14.6173C6.68635 15.0494 6.59297 15.5126 6.59297 16C6.59297 17.763 5.15769 19.201 3.3904 19.201H2.36668C2.42893 19.4707 2.4981 19.7368 2.57765 19.9995H3.39386C5.60038 19.9995 7.39534 18.2055 7.39534 16ZM9.48773 3.60745C9.88891 3.39658 10.3039 3.203 10.7293 3.03016H10.7328C10.1552 4.53041 8.69919 5.60202 6.99761 5.60202H6.62755C6.9734 5.28745 7.33654 4.99362 7.71352 4.71708C8.42251 4.55461 9.04504 4.15708 9.48773 3.60745ZM21.2708 28.9699C21.6962 28.7971 22.1112 28.6035 22.5124 28.3926C22.9551 27.843 23.5777 27.4455 24.2866 27.283C24.6636 27.0065 25.0268 26.7126 25.3726 26.3981H25.0026C23.301 26.3981 21.8449 27.4697 21.2674 28.9699H21.2708ZM25.0026 22.7995C26.7698 22.7995 28.2051 21.3615 28.2051 19.5986L28.1982 19.602C28.1982 18.2124 28.9141 16.9852 29.9932 16.2697C29.9862 16.6326 29.969 16.9887 29.9344 17.3447C29.3568 17.922 29.0006 18.7205 29.0006 19.602C29.0006 21.8074 27.2056 23.6015 24.9991 23.6015H23.135C22.8894 23.764 22.5989 23.8573 22.2842 23.8573C21.9694 23.8573 21.6789 23.7605 21.4334 23.6015H21.3953C19.628 23.6015 18.1928 25.0395 18.1928 26.8025C18.1928 28.1023 17.5668 29.2568 16.6019 29.9862C16.3978 29.9931 16.1938 30 15.9897 30C15.5781 30 15.1735 29.9793 14.7723 29.9447C16.2595 29.6682 17.3904 28.365 17.3904 26.7991C17.3904 24.7872 18.8879 23.121 20.8281 22.8445C20.7624 22.6716 20.7244 22.4919 20.7244 22.2983C20.7244 22.1255 20.759 21.9595 20.8143 21.8005H19.5935C17.8262 21.8005 16.3909 23.2386 16.3909 25.0015C16.3909 27.207 14.5959 29.001 12.3894 29.001H10.7916C10.214 28.7729 9.6572 28.5033 9.12113 28.2025H12.3894C14.1567 28.2025 15.592 26.7645 15.592 25.0015C15.592 22.7961 17.3869 21.002 19.5935 21.002H21.4299C21.6755 20.843 21.966 20.7462 22.2842 20.7462C22.6024 20.7462 22.8929 20.8395 23.1384 21.002H23.2007C24.968 21.002 26.4032 19.564 26.4032 17.801C26.4032 15.7892 27.9008 14.123 29.841 13.8465C29.879 14.1057 29.9136 14.3719 29.9378 14.6381C28.3919 14.8662 27.2022 16.1971 27.2022 17.801C27.2022 19.8233 25.6908 21.4929 23.7402 21.7591C23.8059 21.9284 23.844 22.1082 23.844 22.2983C23.844 22.4746 23.8094 22.6405 23.754 22.7995H25.0026ZM12.7975 21.3995C12.7975 20.2277 13.4304 19.2079 14.3711 18.6479C14.8449 18.9383 15.4018 19.1112 15.9966 19.1112C16.8578 19.1112 17.6325 18.762 18.1962 18.1986H19.5969C21.8034 18.1986 23.5984 16.4045 23.5984 14.1991C23.5984 12.4361 25.0337 10.9981 26.801 10.9981H29.0801C28.9764 10.7284 28.8657 10.4623 28.7446 10.1995H26.801C24.5944 10.1995 22.7995 11.9936 22.7995 14.1991C22.7995 15.962 21.3642 17.4 19.5969 17.4H18.7738C18.9606 17.0302 19.0747 16.6153 19.0989 16.1798C20.6656 15.6371 21.7965 14.1507 21.7965 12.4015C21.7965 10.6524 23.2318 9.20053 24.9991 9.20053H28.2397C28.0875 8.92745 27.925 8.66128 27.7555 8.40202H24.9991C22.7926 8.40202 20.9976 10.1961 20.9976 12.4015C20.9976 13.7255 20.1883 14.8662 19.0401 15.3502C18.9225 14.7902 18.6493 14.2889 18.2758 13.8845C19.3168 13.162 20.0016 11.9591 20.0016 10.6005C20.0016 8.83757 21.4368 7.39955 23.2041 7.39955H26.8044C26.857 7.39955 26.908 7.39653 26.9595 7.39349C26.986 7.39192 27.0126 7.39035 27.0396 7.38918C26.8286 7.11955 26.6108 6.85337 26.379 6.60103H23.2041C20.9976 6.60103 19.2027 8.3951 19.2027 10.6005C19.2027 11.7724 18.5697 12.7921 17.629 13.3521C17.1552 13.0618 16.5984 12.8889 16.0035 12.8889C15.1424 12.8889 14.3677 13.2381 13.8039 13.8015H12.4032C10.1967 13.8015 8.40176 15.5956 8.40176 17.801C8.40176 19.564 6.96648 21.002 5.19919 21.002H2.91658C3.02034 21.2716 3.13101 21.5378 3.25206 21.8005H5.19573C7.40226 21.8005 9.19722 20.0065 9.19722 17.801C9.19722 16.0381 10.6325 14.6 12.3998 14.6H13.2229C13.0361 14.9699 12.922 15.3847 12.8978 15.8203C11.3311 16.363 10.2002 17.8494 10.2002 19.5986C10.2002 21.3477 8.7649 22.7995 6.99761 22.7995H3.757C3.90917 23.0726 4.07172 23.3388 4.24119 23.5981H6.99761C9.20413 23.5981 10.9991 21.804 10.9991 19.5986C10.9991 18.2746 11.8084 17.1339 12.9566 16.6499C13.0742 17.2099 13.3474 17.7112 13.7209 18.1156C12.6799 18.8381 11.9951 20.041 11.9951 21.3995C11.9951 23.1625 10.5599 24.6005 8.79257 24.6005H5.19227C5.13979 24.6005 5.08881 24.6035 5.03734 24.6066L5.03725 24.6066C5.01075 24.6082 4.98412 24.6097 4.9571 24.6109C5.16807 24.8805 5.38595 25.1467 5.61767 25.3991H8.79257C10.9991 25.3991 12.7941 23.605 12.7941 21.3995H12.7975ZM17.802 19.9995C16.0347 19.9995 14.5994 21.4376 14.5994 23.2005L14.6063 23.1971C14.6063 25.4025 12.8113 27.1966 10.6048 27.1966H7.60285C7.27429 26.9512 6.95611 26.6884 6.65176 26.4153C6.76589 26.405 6.88348 26.3981 7.00107 26.3981H10.6014C12.3687 26.3981 13.8039 24.96 13.8039 23.1971C13.8039 20.9916 15.5989 19.1976 17.8054 19.1976H21.4057C21.7446 19.1976 22.0732 19.1457 22.381 19.0455C22.3084 18.8657 22.2669 18.6721 22.2669 18.4682C22.2669 17.6074 22.962 16.9126 23.8232 16.9126C24.0376 16.9126 24.2417 16.9541 24.4284 17.0336C24.5426 16.7087 24.6048 16.3595 24.6048 15.9966C24.6048 13.7912 26.3998 11.9971 28.6063 11.9971H29.4225C29.5021 12.2598 29.5712 12.526 29.6335 12.7956H28.6063C26.839 12.7956 25.4037 14.2336 25.4037 15.9966C25.4037 16.5531 25.2861 17.082 25.0821 17.5625C25.2654 17.8183 25.3761 18.1294 25.3761 18.4682C25.3761 19.3289 24.6809 20.0237 23.8197 20.0237C23.4704 20.0237 23.1488 19.9062 22.8894 19.7092C22.4294 19.8958 21.9279 19.9995 21.4023 19.9995H17.802ZM5.11445 8.22242C5.70512 8.22178 6.21624 7.88664 6.47884 7.39971H8.79949C11.006 7.39971 12.801 5.60563 12.801 3.4002C12.801 3.02341 12.8701 2.66391 12.9912 2.3286C12.6868 2.39428 12.3894 2.47033 12.092 2.55675C12.0332 2.82983 12.0021 3.10983 12.0021 3.4002C12.0021 5.16317 10.5668 6.60119 8.79949 6.60119H6.66559C6.63101 5.77502 5.95314 5.11131 5.11619 5.11131C4.27923 5.11131 3.55986 5.80613 3.55986 6.66687C3.55986 7.52703 4.25409 8.22149 5.11445 8.22242ZM5.11445 8.22242L5.11619 8.22242H5.11273L5.11445 8.22242ZM25.6355 24.6005C25.8948 24.1062 26.4067 23.7674 27.005 23.7674C27.8662 23.7674 28.5613 24.4623 28.5613 25.323C28.5613 26.1837 27.8385 26.8786 27.005 26.8786C26.1715 26.8786 25.4971 26.2218 25.4556 25.3991H23.2041C21.4368 25.3991 20.0016 26.8371 20.0016 28.6C20.0016 28.8904 19.9704 29.1704 19.9116 29.4435C19.6142 29.5299 19.3168 29.606 19.0124 29.6716C19.1335 29.3363 19.2027 28.9768 19.2027 28.6C19.2027 26.3946 20.9976 24.6005 23.2041 24.6005H25.6355Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default AntiOdour;
