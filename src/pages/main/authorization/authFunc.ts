import { IUserAuthorized } from '../../../types/auth';
import State from '../../../types/state';
import { requestPost } from './requests';
import { signInLink, signUpLink } from '../../../const';
import AuthModalView from './authview';

class Authorization {
  signUpModal = AuthModalView.drawSignUpModal();

  signInModal = AuthModalView.drawSignInModal();

  state: State;

  constructor(state: State) {
    this.state = state;
  }

  fixOverlay() {
    const signin = document.querySelector('.modal__signin') as HTMLElement;
    const signup = document.querySelector('.modal__signup') as HTMLElement;
    if (!signin.classList.contains('hidden') || !signup.classList.contains('hidden')) {
      (document.querySelector('body') as HTMLElement).style.overflow = 'hidden';
    } else {
      (document.querySelector('body') as HTMLElement).style.overflow = 'visible';
    }
  }

  showAuthModal = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('auth__btn') || target.classList.contains('auth-button_add')) {
      document.querySelector(`.modal__${target.dataset.auth}`)?.classList.remove('hidden');
    }
    this.fixOverlay();
  };

  closeAuthModal = (event: Event) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.modal__auth') || target.classList.contains('cancel') || target.classList.contains('auth-button_add')) {
      target.closest('.modal')?.classList.add('hidden');
    }
    this.fixOverlay();
  };

  showPassword = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const password = document.querySelector<HTMLInputElement>(`#${target.value}-password`);
    if (password) {
      if (target.checked) {
        password.type = 'text';
      } else {
        password.type = 'password';
      }
    }
  };

  showAuthorizedUser = (key: string) => {
    if (localStorage.getItem(key)) {
      const userName = JSON.parse(localStorage.getItem(key) || '');
      document.querySelectorAll('.auth__btn')?.forEach((btn) => btn.classList.add('hidden'));
      document.querySelectorAll('.user')?.forEach((user) => user.classList.remove('hidden'));
      (document.querySelector('.user__name') as HTMLElement).textContent = userName;
    } else {
      document.querySelectorAll('.auth__btn')?.forEach((btn) => btn.classList.remove('hidden'));
      document.querySelectorAll('.user')?.forEach((user) => user.classList.add('hidden'));
    }
  };

  setLocalStorage(key: string, data: IUserAuthorized) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  clearLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  signIn = (email: string, password: string) => {
    requestPost(signInLink, { email, password }).then((response) => {
      Object.keys(response).forEach((key) => {
        this.setLocalStorage(key, response[key]);
      });
      document.querySelectorAll('.modal')?.forEach((modal) => modal.classList.add('hidden'));
      this.fixOverlay();
      this.showAuthorizedUser('name');
    }).finally(() => document.querySelectorAll<HTMLButtonElement>('.auth-button').forEach((button) => {
      button.removeAttribute('disabled');
    }));
  };

  signUp = (name: string, email: string, password: string) => {
    requestPost(signUpLink, { name, email, password }).then(() => {
      this.signIn(email, password);
      this.fixOverlay();
    }).finally(() => document.querySelectorAll<HTMLButtonElement>('.auth-button').forEach((button) => {
      button.removeAttribute('disabled');
    }));
  };
}

export default Authorization;
