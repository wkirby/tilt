import styled from "@emotion/styled";
import { snakeCase } from "change-case";
import { asset, ins } from "duck-cli";
import { ProofWrapper } from "duck-cli/dist/components/Proof";
import React from "react";
import { Icons, Sigils } from "./components/Icons";
import { COLORS } from "./lib/colors";
import { templateString } from "./lib/utils";
import { Styles } from "./lib/styles";
import _ from "lodash";

const BorderLine = styled.hr({
  margin: 0,
  border: 0,
  borderTopStyle: "solid",
  borderTopWidth: 3,
  position: "absolute"
});

const SigilCorners = ({ sigil, fill, stroke, children, ...props }) => {
  const sigilSize = ins(0.1875);
  const sigilInset = ins(0.25);
  const Sigil = Sigils[sigil];

  return (
    <div {...props}>
      <Sigil
        width={sigilSize}
        height={sigilSize}
        fill={fill}
        stroke={stroke}
        strokeWidth={3}
        style={{ position: "absolute", top: sigilInset, left: sigilInset }}
      />

      <Sigil
        width={sigilSize}
        height={sigilSize}
        fill={fill}
        stroke={stroke}
        strokeWidth={3}
        style={{
          position: "absolute",
          bottom: sigilInset,
          right: sigilInset,
          transform: "rotate(180deg)"
        }}
      />

      <BorderLine
        style={{
          borderTopWidth: 2,
          borderColor: fill,
          top: sigilInset + sigilSize / 2,
          left: sigilInset + sigilSize,
          right: sigilInset + sigilSize / 2
        }}
      />

      <BorderLine
        style={{
          borderTopWidth: 2,
          borderColor: fill,
          bottom: sigilInset + sigilSize / 2,
          right: sigilInset + sigilSize,
          left: sigilInset + sigilSize / 2
        }}
      />

      {children}
    </div>
  );
};

const getColor = col => {
  if (col === "RED") {
    return COLORS.RED;
  } else {
    return COLORS.BLUE;
  }
};

const getBorderColor = col => {
  if (col === "RED") {
    return COLORS.RED_DARK;
  } else {
    return COLORS.BLUE_DARK;
  }
};

const getSigil = col => {
  if (col === "RED") {
    return "red_knight";
  } else {
    return "blue_knight";
  }
};

const CardForeground = styled.div({
  backgroundImage: `url(${asset("parchment.png")})`,
  backgroundSize: "fill",
  backgroundBlendMode: "multiply",
  borderRadius: ins(0.125),
  padding: ins(0.125),
  color: COLORS.BROWN,
  backgroundColor: COLORS.TAN,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontSize: 18
});

const CardBorder = styled.div({
  height: "100%",
  backgroundImage: `url(${asset("parchment.png")})`,
  backgroundSize: "fill",
  backgroundBlendMode: "darken",
  backgroundColor: COLORS.BROWN,
  padding: ins(0.1875)
});

const DescriptionBlock = styled.div({
  paddingLeft: ins(0.125),
  paddingRight: ins(0.125),
  lineHeight: "1.415",
  textShadow: `0 1px 0 rgba(255,255,255,0.75)`
});

const StandardCard = ({
  knightBorderColor,
  knightColor,
  Icon,
  name,
  sigil,
  description
}) => {
  return (
    <>
      <SigilCorners
        fill={knightColor}
        stroke={knightBorderColor}
        sigil={sigil}
      />

      {Icon && <Icon
        width={ins(1)}
        height={ins(1)}
        fill={knightColor}
        stroke={knightBorderColor}
        strokeWidth={4}
      />}

      <DescriptionBlock>
        <h1 style={Styles.Text.header}>{name}</h1>
        <p style={Styles.Text.p}>{templateString(description)}</p>
      </DescriptionBlock>
    </>
  );
};

const getTypeColor = type => {
  switch (type) {
    case 0:
      return "white";
    case 1:
      return 'lightyellow';
    case 2:
      return 'lightgreen';
    default:
      return 'transparent';
  }
};

const TargetBox = styled.div(props => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: ins(0.25),
  height: ins(0.25),
  backgroundColor: getTypeColor(props.type),
  boxShadow: "inset 0 1px 4px rgba(0,0,0,0.1)",
  border: `1px solid ${COLORS.BROWN}`,
  borderRadius: ins(1 / 64),
  fontFamily: "NewRocker",
  fontSize: "1.5rem",
  opacity: 0.9
}));

const GridBox = styled.div({
  display: "grid",
  gridTemplateColumns: "auto auto auto",
  gridGap: ins(1 / 16)
});

const TargetGrid = props => {
  const TARGETS = [
    [0, 1, 0],
    [1, 2, 1],
    [0, 1, 0]
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${asset("shield.svg")})`,
        backgroundSize: "fill",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "darken",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <GridBox>
        {_.map(_.flatten(TARGETS), (type, i) => (
          <TargetBox type={type} key={i}>
            {type > 0 && `+${type}`}
          </TargetBox>
        ))}
      </GridBox>
    </div>
  );
};

export default ({ name, description, ...props }) => {
  const iconName = snakeCase(name);
  const Icon = Icons[iconName];
  const knightColor = getColor(props.config._color);
  const knightBorderColor = getBorderColor(props.config._color);
  const sigil = getSigil(props.config._color);

  return (
    <ProofWrapper overlay={"minicard.png"}>
      <CardBorder>
        <CardForeground>
          {name === "target" ? (
            <TargetGrid />
          ) : (
            <StandardCard
              Icon={Icon}
              knightColor={knightColor}
              knightBorderColor={knightBorderColor}
              sigil={sigil}
              name={name}
              description={description}
            />
          )}
        </CardForeground>
      </CardBorder>
    </ProofWrapper>
  );
};
