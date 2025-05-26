import { login } from './components/loginForm';
import { signUp } from './components/signUpForm';
import { createCategory } from './components/createCategoryForm';
import { createProduct } from './components/createProductForm';
import { buyProduct } from './components/buyProduct';
import { createItem } from './components/createItemForm';

const loginForm = document.getElementById('login-form') as HTMLFormElement;
const signUpForm = document.getElementById('sign-up-form') as HTMLFormElement;
const createCategoryForm = document.getElementById(
  'create-category-form'
) as HTMLFormElement;
const createProductform = document.getElementById(
  'create-product-form'
) as HTMLFormElement;
const createItemForm = document.getElementById(
  'create-item-form'
) as HTMLFormElement;

const buyProductBtns = document.querySelectorAll(
  '.product-card .product-details .product-buy'
) as NodeListOf<HTMLDivElement>;

console.log(buyProductBtns || 'No products found');

const copyBtns = document.querySelectorAll(
  '.copy-btn'
) as NodeListOf<HTMLElement>;

if (loginForm) {
  loginForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement)!.value;
    const password = (document.getElementById('password') as HTMLInputElement)!
      .value;

    login(email, password);
  });
}

if (signUpForm) {
  signUpForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement)!.value;
    const username = (document.getElementById('username') as HTMLInputElement)!
      .value;
    const password = (document.getElementById('password') as HTMLInputElement)!
      .value;
    const passwordConfirm = (document.getElementById(
      'password-confirm'
    ) as HTMLInputElement)!.value;

    signUp(email, username, password, passwordConfirm);
  });
}

if (createCategoryForm) {
  createCategoryForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const form = new FormData();

    const imageInput = (document.getElementById('image') as HTMLInputElement)!;
    const name = (document.getElementById('name') as HTMLInputElement)!.value;
    const description = (document.getElementById(
      'description'
    ) as HTMLInputElement)!.value;

    if (imageInput.files && imageInput.files.length > 0) {
      const image = imageInput.files[0];
      console.log(image);
      form.append('categoryImage', image);
    }
    form.append('name', name);
    form.append('description', description);

    console.log(name);
    console.log(description);

    createCategory(form);
  });
}

if (createProductform) {
  createProductform.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const form = new FormData();

    const name = (document.getElementById('name')! as HTMLInputElement).value;
    const price = (document.getElementById('price')! as HTMLInputElement).value;
    const description = (
      document.getElementById('description')! as HTMLInputElement
    ).value;
    const currency = (
      document.getElementById('product-currency')! as HTMLInputElement
    ).value;
    const categoryId = (
      document.getElementById('product-category')! as HTMLInputElement
    ).value;
    const productImagesInput = document.getElementById(
      'product-images'
    )! as HTMLInputElement;

    console.log(`categoryId: ${categoryId}`);

    form.append('name', name);
    form.append('description', description);
    form.append('price', price);
    form.append('currency', currency);
    form.append('categoryId', categoryId);
    if (productImagesInput.files && productImagesInput.files.length > 0) {
      for (const file of productImagesInput.files) {
        form.append('productImages', file);
      }
    }
    createProduct(form);
  });
}

buyProductBtns.forEach((el) => {
  console.log(el);
  el.addEventListener('click', (ev) => {
    console.log((ev.target as HTMLDivElement).dataset.id);
    const productId = (ev.target as HTMLDivElement).dataset.id!;
    buyProduct(productId);
  });
});

if (createItemForm) {
  createItemForm.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const content = (document.getElementById('content') as HTMLInputElement)
      .value;
    const productId = (
      document.getElementById('item-product') as HTMLInputElement
    ).value;

    createItem(content, productId);
  });
}

if (copyBtns) {
  copyBtns.forEach((btn) => {
    btn.addEventListener('click', (ev) => {
      const wrapper = btn.closest('.item-card');
      const detail = wrapper?.querySelector('.item-details .item-content');
      const code = detail?.textContent;

      const icon = btn.querySelector('.fa-copy');


      navigator.clipboard
        .writeText(code!)
        .then(() => {
          icon?.classList.remove('fa-copy');
          icon?.classList.add('fa-check');
          setTimeout(() => {
            icon?.classList.remove('fa-check');
            icon?.classList.add('fa-copy');
          }, 1000);
        })
        .catch((err) => {});
    });
  });
}
