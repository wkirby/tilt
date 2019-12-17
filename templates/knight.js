import { snakeCase } from "change-case";
import { ins } from "duck-cli";
import { ProofWrapper } from "duck-cli/dist/components/Proof";
import React from "react";
import { Icons } from "./components/Icons";
import { COLORS } from "./lib/colors";
import { templateString } from "./lib/utils";

const SigilCorners = ({ sigil, color, children, ...props }) => {
  const sigilSize = ins(0.1875);
  const sigilInset = ins(0.25);
  return (
    <div {...props}>
      <Icon
        src={sigil}
        color={color}
        size={sigilSize}
        style={{ position: "absolute", top: sigilInset, left: sigilInset }}
      />

      <Icon
        src={sigil}
        color={color}
        size={sigilSize}
        style={{
          position: "absolute",
          bottom: sigilInset,
          right: sigilInset,
          transform: "rotate(180deg)"
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

const getSigil = col => {
  if (col === "RED") {
    return "icons/red_knight.svg";
  } else {
    return "icons/blue_knight.svg";
  }
};

export default ({ name, type, description, ...props }) => {
  const iconName = snakeCase(name);
  const Icon = Icons[iconName];
  const knightColor = getColor(props.config._color);

  return (
    <ProofWrapper overlay={"minicard.png"}>
      <div
        style={{
          height: "100%",
          backgroundColor: COLORS.BROWN,
          padding: ins(0.1875)
        }}
      >
        <div
          style={{
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
          }}
        >
          <Icon
            width={ins(1.25)}
            height={ins(1.25)}
            fill={knightColor}
            stroke={COLORS.RED_DARK}
            strokeWidth={3}
          />

          <div>
            <h1 style={{ marginBottom: 0, fontFamily: "NewRocker" }}>{name}</h1>
            <p style={{ fontFamily: "Roman SD", letterSpacing: -0.5 }}>
              {templateString(description, { name })}
            </p>
          </div>
        </div>
      </div>
    </ProofWrapper>
  );
};
