// 필요 테그
const emailInput = document.querySelector('#email');
const emailForm = document.querySelector('#sign-up__form');
const emailErrorText = emailForm.querySelector('.error-text');
const emailSubmitBtn = emailForm.querySelector('#sign-up__btn-submit');
const signSection = document.querySelector('.sign-up-section');
const successSection = document.querySelector('.success-section');
const printEmail = document.querySelector('.success__contents > p > span');
const dismissBtn = document.querySelector('.success__btn-div');
// const 전역 변수 설정
const CLASS_HIDDEN = 'hidden';
const CLASS_ERROR = 'error';

// email 정규식 함수
const isEmail = (emailValue) => {
  const regExp =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return regExp.test(emailValue);
};

// class 초기화 함수
const onResetClass = (emailInputClass, emailErrorClass) => {
  emailInputClass.remove(CLASS_ERROR);
  emailErrorClass.add(CLASS_HIDDEN);
};

// error 상태 class 추가 함수
const onAddErrorClass = () => {
  const emailErrorClass = emailErrorText.classList;
  const emailInputClass = emailInput.classList;

  // error text hidden class 제거
  emailErrorClass.remove(CLASS_HIDDEN);
  // email input error class 추가
  emailInputClass.add(CLASS_ERROR);
};

// section hidden class toggle 함수
const onSectionClass = () => {
  // subscribe 페이지 hidden 추가 or 삭제
  signSection.classList.toggle(CLASS_HIDDEN);
  // 완료 페이지 hidden class 추가 or 삭제
  successSection.classList.toggle(CLASS_HIDDEN);
};
//email input에 입력되는 값 추적
emailInput.addEventListener('input', ({ target: { value } }) => {
  // 지역 변수
  const emailErrorClass = emailErrorText.classList;
  const emailInputClass = emailInput.classList;

  // 아무 입력이 없을때 class 초기화
  if (value === '') {
    onResetClass(emailInputClass, emailErrorClass);
    return;
  }

  if (isEmail(value)) {
    // email의 형식이 맞다면 class 초기화
    onResetClass(emailInputClass, emailErrorClass);
  } else {
    // error 상태 class 추가 함수 호출
    onAddErrorClass();
  }
});

// submit 버튼이 입력 됐을 때 email 확인
emailSubmitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  // 입력된 이메일 데이터 받기
  let submitEmailValue = emailInput.value;
  if (submitEmailValue === '' || !isEmail(submitEmailValue)) {
    // error 상태 class 추가 함수 호출
    onAddErrorClass();
    // email input 으로 focus 옮기기
    emailInput.focus();
    return;
  }

  // section class toggle 함수 호출
  onSectionClass();

  // 입력된 이메일 출력
  printEmail.innerText = submitEmailValue;
  // 이메일 input 초기화
  emailInput.value = '';
});

// dismiss message btn 클릭시 sign-up 페이지로 돌리기
dismissBtn.addEventListener('click', (event) => {
  // section class toggle 함수 호출
  onSectionClass();
});
