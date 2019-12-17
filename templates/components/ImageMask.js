import { asset } from "duck-cli/dist/lib/assetPath";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

export const ImageMask = styled.div`
  background-color: ${p => (p.color ? p.color : undefined)};
  height: ${p => (p.height ? p.height : undefined)};
  width: ${p => (p.width ? p.width : undefined)};
  mask-image: ${p => `url(${asset(p.src)})`};
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;

  ${props => {
    if (props.size) {
      return css`
        width: ${props.size};
        height: ${props.size};
      `;
    }
  }}
`;
