import styled from "@emotion/styled";
import { snakeCase } from "change-case";
import { ins, asset } from "duck-cli";
import { ProofWrapper } from "duck-cli/dist/components/Proof";
import React from "react";
import { Icons, Sigils } from "./components/Icons";
import { COLORS } from "./lib/colors";
import { templateString } from "./lib/utils";

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
  backgroundImage: `url(${asset("parchment.jpg")})`,
  backgroundSize: "fill",
  borderColor: COLORS.TAN_DARK,
  borderWidth: 2,
  borderStyle: "solid",
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
  backgroundColor: COLORS.BROWN,
  padding: ins(0.1875)
});

export default ({ name, type, description, ...props }) => {
  const iconName = snakeCase(name);
  const Icon = Icons[iconName];
  const knightColor = getColor(props.config._color);
  const knightBorderColor = getBorderColor(props.config._color);
  const sigil = getSigil(props.config._color);

  return (
    <ProofWrapper overlay={"minicard.png"}>
      <CardBorder>
        <CardForeground>
          <SigilCorners
            fill={knightColor}
            stroke={knightBorderColor}
            sigil={sigil}
          />

          <Icon
            width={ins(1)}
            height={ins(1)}
            fill={knightColor}
            stroke={knightBorderColor}
            strokeWidth={4}
          />

          <div>
            <h1 style={{ marginBottom: 0, fontFamily: "NewRocker" }}>{name}</h1>
            <p style={{ fontFamily: "Roman SD", letterSpacing: -0.5 }}>
              {templateString(description, { name })}
            </p>
          </div>
        </CardForeground>
      </CardBorder>
    </ProofWrapper>
  );
};
