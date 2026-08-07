import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type DivuseViewModuleVOhHaVi1Type = {
  className?: string;
  builtInDatabaseForFullStack?: string;

  /** Style props */
  divuseViewModuleVOhHaViBorderBottom?: CSSProperties["borderBottom"];
  divuseViewModuleVOhHaViFlexWrap?: CSSProperties["flexWrap"];
  divuseViewModuleVOhHaViAlignContent?: CSSProperties["alignContent"];
  builtInDatabaseForFontSize?: CSSProperties["fontSize"];
};

const DivuseViewModuleVOhHaVi1: NextPage<DivuseViewModuleVOhHaVi1Type> = ({
  className = "",
  divuseViewModuleVOhHaViBorderBottom,
  divuseViewModuleVOhHaViFlexWrap,
  divuseViewModuleVOhHaViAlignContent,
  builtInDatabaseForFullStack,
  builtInDatabaseForFontSize,
}) => {
  const divuseViewModuleVOhHaViStyle: CSSProperties = useMemo(() => {
    return {
      borderBottom: divuseViewModuleVOhHaViBorderBottom,
      flexWrap: divuseViewModuleVOhHaViFlexWrap,
      alignContent: divuseViewModuleVOhHaViAlignContent,
    };
  }, [
    divuseViewModuleVOhHaViBorderBottom,
    divuseViewModuleVOhHaViFlexWrap,
    divuseViewModuleVOhHaViAlignContent,
  ]);

  const builtInDatabaseForStyle: CSSProperties = useMemo(() => {
    return {
      fontSize: builtInDatabaseForFontSize,
    };
  }, [builtInDatabaseForFontSize]);

  return (
    <div
      className={`self-stretch border-replitcom-pearl-bush border-solid border-b flex items-start pt-3 pb-3 pl-0 pr-0 gap-3 text-left text-[14.6px] text-replitcom-mine-shaft2 font-[Inter] mq450:flex-wrap ${className}`}
      style={divuseViewModuleVOhHaViStyle}
    >
      <div className="h-3.5 w-1.5 flex flex-col items-start pt-2 pb-0 pl-0 pr-0 box-border min-w-1.5">
        <div className="w-1.5 h-1.5 relative rounded-[3px] bg-replitcom-vermilion min-w-1.5" />
      </div>
      <div className="flex-1 overflow-hidden flex flex-col items-start min-w-36">
        <div
          className="self-stretch relative tracking-[-0.48px] leading-[22.4px]"
          style={builtInDatabaseForStyle}
        >
          {builtInDatabaseForFullStack}
        </div>
      </div>
    </div>
  );
};

export default DivuseViewModuleVOhHaVi1;