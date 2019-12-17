import _ from "lodash";

export const templateString = (str, replacements) => {
  return _.reduce(replacements, (res, v, k) => res.replace(`{{${k}}}`, v), str);
};
