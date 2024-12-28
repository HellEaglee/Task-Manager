export const loginRegex = /^[a-zA-Z0-9._-]{3,16}$/;
export const loginRegexPattern = "[a-zA-Z0-9_]{3,16}";

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
export const passwordRegexPattern = `^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*\\(\\),.?&quot;\\:\\{\\}\\|<>])(?=\\S+$).{8,}$`;

export const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
