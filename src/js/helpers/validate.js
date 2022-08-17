const regExpDic = {
  email:
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
  password: /^[0-9a-zA-Z]{4,}$/,
  nickname: /[A-Za-z0-9-_]{4,}/,
  firstname: /[A-Za-z]{2,}/,
  lastname: /[A-Za-z]{2,}/,
  phone: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]{6,}$/g,
  city: /[A-Za-z]{2,}/,
  country: /[A-Za-z]{2,}/,
  birth: /[0,9]{1,}/,
};

/**
 * Function validate. Check Input on RegExp provided in regExpDic by input data-required type
 * @param {HTMLInputElement} el
 * @returns {Boolean} — Return true if input valid or doesn't data-required attr
 */
export function validate(el) {
  const regExpName = el.dataset.required;
  if (!regExpDic[regExpName]) return true;
  return regExpDic[regExpName].test(el.value);
}
