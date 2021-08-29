const funds_money_input = document.getElementById("funds_money_input");
const interest_rate_input = document.getElementById("interest_rate_input");
const repetition_input = document.getElementById("repetition_input");
const submit_button = document.getElementById("submit_button");
const result = document.getElementById("result");
const number_pattern = /^\d*$/;
const prime_number_pattern = /^\d*(\.?\d*)$/;
let fundsMoneyOldValue = "";

// String.prototype.insertcommas = function () {
//   const num = this;
//   let num_arr = Array.prototype.slice.apply(num);
//   let num_with_commas = "";
//   let j = num.length - 3;

//   for (let i = num.length - 1; i >= 0; i--) {
//     console.log(j);

//     if (i == j && i != 0) {
//       num_arr.splice(i, 0, ",");
//       console.log(num_arr);
//       j -= 3;
//     }
//   }

//   num_with_commas = num_arr.join("");
//   return num_with_commas;
// };

String.prototype.deletcommas = function () {
  let num = this;

  for (var k = num.length - 1; k >= 0; k--) {
    num = num.replace(",", "");
  }

  return num;
};

function fundsMoneyInputKeyup() {
  let userFundsMoneyNumber = funds_money_input.value.deletcommas();

  if (
    !number_pattern.test(userFundsMoneyNumber) &&
    userFundsMoneyNumber.length <= 1
  ) {
    funds_money_input.value = "";

    return false;
  } //첫 번째 입력 문자가 숫자가 아닐시

  if (!number_pattern.test(userFundsMoneyNumber)) {
    funds_money_input.value =
      Number(fundsMoneyOldValue).toLocaleString("ko-KR");

    return false;
  } //입력한 문자에 숫자가 아닌 문자가 포함되어 있을 시 직전 값을 input값에 적용

  funds_money_input.value =
    Number(userFundsMoneyNumber).toLocaleString("ko-KR");
  fundsMoneyOldValue = funds_money_input.value.deletcommas(); //새로운 value를 콤마 제거 후 전역으로 저장
}

function checkAll() {
  let interest_rate = "";
  let result_money = "";
  let userFundsMoneyInput = funds_money_input.value.deletcommas();

  if (
    funds_money_input.value &&
    interest_rate_input.value &&
    repetition_input.value
  ) {
    if (funds_money_input.value <= 0) {
      alert("자본금을 바르게 입력해주세요.");
      return false;
    }

    if (prime_number_pattern.test(interest_rate_input.value) === false) {
      alert("이율을 바르게 입력해주세요.");
      return false;
    }

    if (
      number_pattern.test(repetition_input.value) === false ||
      repetition_input.value <= 0
    ) {
      alert("반복 횟수를 정수로 입력해주세요.");
      return false;
    }

    if (interest_rate_input.value < 100) {
      interest_rate = 1 + interest_rate_input.value * 0.01;
    }

    if (interest_rate_input.value >= 100) {
      interest_rate = interest_rate_input.value * 0.01;
    }

    for (let l = 1; l <= repetition_input.value; l++) {
      userFundsMoneyInput = userFundsMoneyInput * interest_rate;

      if (userFundsMoneyInput > 100000000000000) {
        result.style.visibility = "visible";
        result.classList.add("font_red");
        result.innerHTML = "계산 범위를 초과했습니다.";

        return false;
      }
    }

    result.style.visibility = "visible";
    result.classList.remove("font_red");
    result.innerHTML = `최종 금액은</br>${Number(
      userFundsMoneyInput
    ).toLocaleString("ko-KR")}원</br>입니다.`;

    return true;
  } else {
    alert("모든 값을 입력해주세요.");

    return false;
  }
}

funds_money_input.addEventListener("keyup", fundsMoneyInputKeyup);
submit_button.addEventListener("click", checkAll);
