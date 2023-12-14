import React from 'react';
import Discover from './Discover';
import Globe from './Globe';
import Northeast from './Northeast';
import Right from './Right';
import Left from './Left';
import Down from './Down';
import Logo from './Logo';
import Profile from './Profile';
import Bag from './Bag';
import Menu from './Menu';
import Close from './Close';
import Search from './Search';
import BookmarkFilled from './BookmarkFilled';
import BookmarkUnfilled from './BookmarkUnfilled';
import Check from './Check';
import Plus from './Plus';
import Minus from './Minus';
import Dot from './Dot';
import MoistureWicking from './MoistureWicking';
import Breathable from './Breathable';
import DriReleaseFabric from './DriReleaseFabric';
import DWRCoating from './DWRCoating';
import ItalianFabric from './ItalianFabric';
import AntiBacterial from './AntiBacterial';
import AntiOdour from './AntiOdour';
import Bluesign from './Bluesign';
import CompressionFabrics from './CompressionFabrics';
import DownFill from './DownFill';
import FourWayStretch from './FourWayStretch';
import Insulated from './Insulated';
import Lightweight from './Lightweight';
import MAAPHoneycomb from './MAAPHoneycomb';
import Packable from './Packable';
import QuickDrying from './QuickDrying';
import RecycledYarns from './RecycledYarns';
import ReflectiveGraphics from './ReflectiveGraphics';
import SPF50Protection from './SPF50Protection';
import Stowable from './Stowable';
import TapedSeams from './TapedSeams';
import ThermalRegulation from './ThermalRegulation';
import TouchscreenConductive from './TouchscreenConductive';
import UltraLightweight from './UltraLightweight';
import Waterproof from './Waterproof';
import Windproof from './Windproof';
import Circle from './Circle';
import FreeShipping from './FreeShipping';
import FreeReturns from './FreeReturns';
import CrashReplacement from './CrashReplacement';
import BluesignCallout from './BluesignCallout';

import { IconGeneratorType, IconMapping, IconName } from './types';

export {
    Discover,
    Globe,
    Northeast,
    Right,
    Left,
    Logo,
    Profile,
    Bag,
    Menu,
    Close,
    Search,
    BookmarkFilled,
    BookmarkUnfilled,
    Check,
    Plus,
    Minus,
    Dot,
    MoistureWicking,
    Breathable,
    DriReleaseFabric,
    DWRCoating,
    ItalianFabric,
    AntiOdour,
    AntiBacterial,
    Bluesign,
    CompressionFabrics,
    DownFill,
    FourWayStretch,
    Insulated,
    Lightweight,
    MAAPHoneycomb,
    Packable,
    QuickDrying,
    RecycledYarns,
    ReflectiveGraphics,
    SPF50Protection,
    Stowable,
    TapedSeams,
    ThermalRegulation,
    TouchscreenConductive,
    UltraLightweight,
    Waterproof,
    Windproof,
    Circle,
    FreeShipping,
};

const icons: IconMapping = {
    ['globe']: Globe,
    ['discover']: Discover,
    ['down']: Down,
    ['northeast']: Northeast,
    ['right']: Right,
    ['left']: Left,
    ['logo']: Logo,
    ['profile']: Profile,
    ['bag']: Bag,
    ['menu']: Menu,
    ['close']: Close,
    ['search']: Search,
    ['bookmarkfilled']: BookmarkFilled,
    ['bookmarkunfilled']: BookmarkUnfilled,
    ['check']: Check,
    ['plus']: Plus,
    ['minus']: Minus,
    ['dot']: Dot,
    ['moisture-wicking']: MoistureWicking,
    ['dri-release-fabric']: DriReleaseFabric,
    ['dwr-coating']: DWRCoating,
    ['italian-fabric']: ItalianFabric,
    ['breathable']: Breathable,
    ['anti-bacterial']: AntiBacterial,
    ['anti-odour']: AntiOdour,
    ['bluesign']: Bluesign,
    ['compression']: CompressionFabrics,
    ['down-fill']: DownFill,
    ['four-way-stretch']: FourWayStretch,
    ['insulated']: Insulated,
    ['lightweight']: Lightweight,
    ['maap-honeycomb']: MAAPHoneycomb,
    ['packable']: Packable,
    ['quick-drying']: QuickDrying,
    ['recycled-yarns']: RecycledYarns,
    ['reflective-graphics']: ReflectiveGraphics,
    ['spf-50-protection']: SPF50Protection,
    ['stowable']: Stowable,
    ['taped-seams']: TapedSeams,
    ['thermal-regulation']: ThermalRegulation,
    ['touchscreen-conductive']: TouchscreenConductive,
    ['ultra-lightweight']: UltraLightweight,
    ['waterproof']: Waterproof,
    ['windproof']: Windproof,
    ['circle']: Circle,
    ['free-shipping']: FreeShipping,
    ['free-returns']: FreeReturns,
    ['crash-replacement']: CrashReplacement,
    ['blue-sign']: BluesignCallout,
};

export const transformMappingIconKey = (key: string | null) => {
    return key ? (key.split(' ').join('').toLowerCase() as IconName) : null;
};

interface IconProps {
    icon: IconName;
    className?: string;
}

export const Icon: React.FC<IconProps> = ({ icon, className, ...rest }) => {
    if (!icon) {
        return null;
    }

    const ComponentIcon = icons[icon];
    if (!ComponentIcon) {
        return null;
    }
    const IconComponent = ComponentIcon as IconGeneratorType;
    return <IconComponent className={className} {...rest} />;
};

export default Icon;
