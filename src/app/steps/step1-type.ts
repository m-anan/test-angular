import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferingStore } from '../store/offer';

@Component({
  selector: 'app-step1-type',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="text-2xl font-semibold ">What are you offering?</h2>
    <span>Pick the type that suits your offering the most.</span>

    <div class="mt-8  p-3 rounded-2xl bg-[#CCE8F3] w-fit">
      <h3 class="text-[#0F7394] font-semibold pb-2">Based on your type of company:</h3>
      <div class="flex gap-4">
        <div class="flex ">
          <span class="bg-[#1A99C3] text-white p-1 rounded-l-xl px-3">Company Type</span>
          <span class="text-[#1A99C3] bg-white p-1 rounded-r-xl flex gap-2 px-3"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M16.6666 0H9.99998C9.08081 0 8.33331 0.7475 8.33331 1.66667V9.69583L11.9683 6.66667H16.6666C17.5858 6.66667 18.3333 5.91917 18.3333 5V1.66667C18.3333 0.7475 17.5858 0 16.6666 0Z"
                fill="#1A99C3"
              />
              <path
                d="M4.58333 14.1667C2.05583 14.1667 0 16.2225 0 18.75V20H9.16667V18.75C9.16667 16.2225 7.11083 14.1667 4.58333 14.1667Z"
                fill="#1A99C3"
              />
              <path
                d="M4.58331 12.9167C5.96402 12.9167 7.08331 11.7974 7.08331 10.4167C7.08331 9.03598 5.96402 7.91669 4.58331 7.91669C3.2026 7.91669 2.08331 9.03598 2.08331 10.4167C2.08331 11.7974 3.2026 12.9167 4.58331 12.9167Z"
                fill="#1A99C3"
              />
              <path
                d="M15.4166 14.1667C17.9441 14.1667 20 16.2225 20 18.75V20H10.8333V18.75C10.8333 16.2225 12.8891 14.1667 15.4166 14.1667Z"
                fill="#1A99C3"
              />
              <path
                d="M15.4167 12.9167C16.7974 12.9167 17.9167 11.7974 17.9167 10.4167C17.9167 9.03598 16.7974 7.91669 15.4167 7.91669C14.036 7.91669 12.9167 9.03598 12.9167 10.4167C12.9167 11.7974 14.036 12.9167 15.4167 12.9167Z"
                fill="#1A99C3"
              />
            </svg>
            Consultancy</span
          >
        </div>

        <div class="flex items-center gap-2">
          <span class="text-[#0F7394]">Categories:</span>
          <span
            *ngFor="let category of ['Law', 'Accounting', 'Notary']"
            class="text-[#0F7394] border border-[#0F7394] rounded-xl p-1 px-3"
            >{{ category }}</span
          >
        </div>
      </div>
    </div>
    <span class="text-[#0F7394] flex text-sm pl-2 gap-2 items-center pt-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M2.025 4.622C2.093 4.826 2.285 4.964 2.5 4.964C2.715 4.964 2.906 4.826 2.975 4.622L3.396 3.359L4.659 2.938C4.863 2.87 5.001 2.679 5.001 2.464C5.001 2.249 4.863 2.058 4.659 1.99L3.396 1.569L2.975 0.306C2.838 -0.102 2.163 -0.102 2.026 0.306L1.605 1.569L0.342 1.99C0.138 2.058 0 2.249 0 2.464C0 2.679 0.138 2.87 0.342 2.938L1.605 3.359L2.025 4.622Z"
          fill="#0F7394"
        />
        <path
          d="M15.525 7.80198L10.99 6.00898L9.19699 1.47398C8.96999 0.901983 8.02899 0.901983 7.80199 1.47398L6.00899 6.00898L1.47399 7.80198C1.18799 7.91498 0.998993 8.19198 0.998993 8.49898C0.998993 8.80598 1.18699 9.08298 1.47399 9.19598L6.00899 10.989L7.80199 15.524C7.91499 15.81 8.19199 15.998 8.49899 15.998C8.80599 15.998 9.08299 15.81 9.19599 15.524L10.989 10.989L15.524 9.19598C15.81 9.08298 15.999 8.80598 15.999 8.49898C15.999 8.19198 15.812 7.91498 15.525 7.80198Z"
          fill="#0F7394"
        />
      </svg>
      Unita AI suggests: Service</span
    >
    <div class="mt-8 bg-white p-8 rounded-t-2xl border-b border-gray-200 ">
      <h3 class="text-lg font-semibold ">Pick Offering Type</h3>
      <div class="grid grid-cols-3 gap-4 pt-4 relative">
        <button
          class="{{ buttonStyle }}"
          [ngClass]="{
            'bg-[#FFF8F7] border-[#F0895E] border-2': store.value.offeringType === 'product'
          }"
          (click)="select('product')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="28"
            viewBox="0 0 30 28"
            fill="none"
          >
            <path d="M15 17.3333L20 20V9.99988H10V20L15 17.3333Z" fill="#939393" />
            <path
              d="M19.0588 21.7647C19.6787 22.0953 20.4266 22.0764 21.029 21.7149C21.6314 21.3535 22 20.7025 22 20V10H29V25C29 26.6569 27.6569 28 26 28H4C2.34315 28 1 26.6569 1 25V10H8V20C8 20.7025 8.3686 21.3535 8.97101 21.7149C9.5734 22.0764 10.3213 22.0953 10.9412 21.7647L15 19.6L19.0588 21.7647Z"
              fill="#939393"
            />
            <path d="M21 0V8H9V0H21Z" fill="#939393" />
            <path d="M7 8V0H0V8H7Z" fill="#939393" />
            <path d="M23 8H30V0H23V8Z" fill="#939393" />
          </svg>
          <span class="font-bold text-xl"> Product</span>
          <span class="text-sm text-[#303030]">Goods to sell, physical or digital</span>
        </button>
        <div>
          <span class="text-sm text-[#F0895E] absolute -top-3 ">Suggested!</span>
          <button
            class="{{ buttonStyle }}"
            [ngClass]="{
              'bg-[#FFF8F7] border-[#F0895E] border-2': store.value.offeringType === 'service'
            }"
            (click)="select('service')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
            >
              <path
                d="M28.4472 8.06554L20.1834 3.27249C18.5267 2.31388 16.4734 2.31388 14.8167 3.27249L6.5528 8.06554C4.90975 9.01832 3.88892 10.7917 3.88892 12.6894V22.3067C3.88892 24.2064 4.90975 25.9778 6.5528 26.9325L14.8167 31.7255C15.645 32.2058 16.5725 32.445 17.5 32.445C18.4275 32.445 19.355 32.2039 20.1834 31.7255L28.4472 26.9325C30.0903 25.9797 31.1111 24.2064 31.1111 22.3086V12.6914C31.1111 10.7917 30.0903 9.02026 28.4472 8.06554ZM16.2809 5.79638C17.0353 5.35888 17.9686 5.35888 18.7192 5.79638L26.7459 10.4514L23.8195 12.1489L18.2311 8.90749C17.7781 8.64499 17.22 8.64499 16.767 8.90749L11.1786 12.1489L8.25225 10.4514L16.2789 5.79638H16.2809ZM17.5 23.1447L12.6292 20.3258L16.0417 18.3464L20.9125 21.1653L17.5 23.1447ZM22.3611 18.6336L17.5 15.8301V11.8732L22.3611 14.6767V18.6336ZM8.01697 24.4125C7.27031 23.9789 6.80558 23.1719 6.80558 22.3086V12.983L9.72225 14.6747V21.1633C9.72225 21.6844 10.0003 22.1647 10.4495 22.4253L16.0417 25.6686V29.0636L8.01697 24.4105V24.4125Z"
                fill="url(#paint0_linear_1_101)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1_101"
                  x1="3.88892"
                  y1="17.4993"
                  x2="31.1111"
                  y2="17.4993"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F0895E" />
                  <stop offset="1" stop-color="#DE768A" />
                </linearGradient>
              </defs>
            </svg>
            <span class="font-bold text-xl"> Service</span>
            <span class="text-sm text-[#303030]"
              >Work you provide, project-based or in installments</span
            >
          </button>
        </div>
        <button
          class="{{ buttonStyle }}"
          [ngClass]="{
            'bg-[#FFF8F7] border-[#F0895E] border-2': store.value.offeringType === 'subscription'
          }"
          (click)="select('subscription')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.5312 7.21875V25.7812H15.4688V7.21875H17.5312Z"
              fill="#939393"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.22412 9.15419C4.68744 11.2411 3.78125 13.8117 3.78125 16.5948C3.78125 23.5601 9.46887 29.2187 16.5 29.2187C17.8319 29.2187 19.1141 29.0159 20.3179 28.6403L21.3024 28.3333L21.9165 30.3022L20.9321 30.6093C19.5316 31.0461 18.0424 31.2812 16.5 31.2812C8.34329 31.2812 1.71875 24.7126 1.71875 16.5948C1.71875 13.7237 2.54882 11.0435 3.98269 8.78039L4.56468 7.9294C4.61392 7.86251 6.31681 9.02885 6.22412 9.15419Z"
              fill="#939393"
            />
            <path
              d="M12.684 4.36334L11.7001 4.67235L11.082 2.70463L12.0659 2.39561C13.467 1.95558 14.9568 1.71875 16.4999 1.71875C24.6634 1.71875 31.2812 8.33656 31.2812 16.5C31.2812 19.6301 30.2461 22.5022 28.5362 25.0816L28.5144 25.1121L26.839 23.9092C28.4421 21.6767 29.2187 19.2523 29.2187 16.5C29.2187 8.02209 20.6507 1.86115 12.684 4.36334Z"
              fill="#939393"
            />
            <path
              d="M31.0083 25.6824L25.1615 28.5734L24.7417 22.0643L31.0083 25.6824Z"
              fill="#939393"
            />
            <path
              d="M1.99158 7.31763L7.83846 4.42664L8.25825 10.9357L1.99158 7.31763Z"
              fill="#939393"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.6562 13.5781C10.6562 11.3949 12.4261 9.625 14.6094 9.625H20.625V11.6875H14.6094C13.5652 11.6875 12.7188 12.534 12.7188 13.5781C12.7188 14.6223 13.5652 15.4688 14.6094 15.4688H18.3906C20.5738 15.4688 22.3438 17.2386 22.3438 19.4219C22.3438 21.6051 20.5738 23.375 18.3906 23.375H12.375V21.3125H18.3906C19.4348 21.3125 20.2812 20.4661 20.2812 19.4219C20.2812 18.3777 19.4348 17.5312 18.3906 17.5312H14.6094C12.4261 17.5312 10.6562 15.7614 10.6562 13.5781Z"
              fill="#939393"
            />
          </svg>
          <span class="font-bold text-xl">Subscription</span>
          <span class="text-sm text-[#303030]">Recurring payments for consistent value</span>
        </button>
      </div>

      <div *ngIf="store.value.offeringType === 'product'" class="mt-4 flex gap-4 ">
        <label
          class="w-full text-center border rounded-lg py-2 cursor-pointer flex items-center justify-center gap-2"
          [ngClass]="{
            'bg-[#FFF8F7] text-[#DE768A] border-2': store.value.productType === 'physical'
          }"
          ><input
            class="appearance-none"
            type="radio"
            (click)="setProduct('physical')"
            name="product"
            [class.bg-[#DE768A]]="store.value.productType === 'physical'"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
          >
            <path
              d="M14.555 2.96975L8.211 0.150751C7.758 -0.0512491 7.239 -0.0492491 6.789 0.150751L0.445 2.96975C0.174 3.09075 0 3.35875 0 3.65575V11.5058C0 12.1958 0.408 12.8238 1.039 13.1058L6.789 15.6608C7.015 15.7618 7.258 15.8118 7.5 15.8118C7.742 15.8118 7.985 15.7618 8.211 15.6618L13.961 13.1058C14.592 12.8248 15 12.1968 15 11.5068V3.65575C15 3.35975 14.826 3.09075 14.555 2.96975ZM7.399 1.52075C7.463 1.49275 7.537 1.49275 7.601 1.52075L8.652 1.98775L3.749 4.16675L2.596 3.65475L7.398 1.52075H7.399ZM7.601 5.78975C7.537 5.81775 7.463 5.81875 7.398 5.78975L5.597 4.98975L10.5 2.81075L12.403 3.65675L7.601 5.79075V5.78975ZM13.5 11.5058C13.5 11.6048 13.441 11.6938 13.352 11.7348L8.25 14.0018V7.14375L13.5 4.81075V11.5058Z"
              fill="#939393"
              [ngClass]="{ 'fill-[#DE768A]': store.value.productType === 'physical' }"
            />
          </svg>
          Physical Product</label
        >
        <label
          class="w-full text-center border rounded-lg py-2 cursor-pointer flex justify-center items-center gap-2"
          [ngClass]="{
            'bg-[#FFF8F7] text-[#DE768A] border-2': store.value.productType === 'digital'
          }"
          ><input
            class="appearance-none "
            type="radio"
            (click)="setProduct('digital')"
            name="product"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M19.316 4.56933L15.4307 0.684C14.9893 0.242667 14.404 0 13.7813 0H3.88C1.74133 0 0 1.74133 0 3.88V16.12C0 18.2587 1.74133 20 3.88 20H16.12C18.2587 20 20 18.2587 20 16.12V6.21867C20 5.596 19.7573 5.00933 19.316 4.56933ZM4.66667 2H12.6667V4.66667C12.6667 5.4 12.0667 6 11.3333 6H6C5.26667 6 4.66667 5.4 4.66667 4.66667V2ZM15.3333 18H4.66667V12.6667C4.66667 11.9333 5.26667 11.3333 6 11.3333H14C14.7333 11.3333 15.3333 11.9333 15.3333 12.6667V18Z"
              fill="#939393"
              [ngClass]="{
                'fill-[#DE768A]': store.value.productType === 'digital'
              }"
            />
          </svg>
          Digital Product
        </label>
      </div>
    </div>
    <div class="bg-white rounded-b-2xl py-4">
      <div
        class="m-auto p-4 bg-[#CCE8F3] text-[#303030] text-sm w-fit flex flex-col items-center rounded-2xl text-center px-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M16.8347 3.04824H16.8333C15.032 1.58411 12.672 1.02291 10.3587 1.50398C7.38921 2.12411 5.02267 4.55211 4.46921 7.54531C3.87721 10.7442 5.28521 13.8786 8.00121 15.5345V19C8.00121 21.0228 9.64641 22.6666 11.6679 22.6666H12.3345C14.3572 22.6666 16.0012 21.0228 16.0012 19V15.5345C18.2785 14.1452 19.6679 11.6946 19.6679 8.99998C19.6679 6.68131 18.6347 4.51211 16.8347 3.04824ZM14 19.0001C14 19.9188 13.252 20.6668 12.3333 20.6668H11.6667C10.748 20.6668 10 19.9188 10 19.0001V17.3334H14V19.0001ZM14.6653 9.55478L12.6653 12.5548C12.4745 12.8412 12.1581 13.0001 11.8327 13.0001C11.6849 13.0001 11.5345 12.9676 11.3939 12.8985C10.944 12.6785 10.7259 12.1589 10.8848 11.6837L11.446 10.0001H10.1667C9.79814 10.0001 9.45894 9.79704 9.28521 9.47211C9.11067 9.14664 9.13027 8.75211 9.33467 8.44544L11.3347 5.44544C11.612 5.02878 12.1563 4.88038 12.6061 5.10171C13.056 5.32171 13.2741 5.84131 13.1152 6.31651L12.554 8.00011H13.8333C14.2019 8.00011 14.5411 8.20318 14.7148 8.52811C14.8893 8.85358 14.8697 9.24811 14.6653 9.55478Z"
            fill="#24799A"
          />
        </svg>
        <h3 class="font-bold">Product Explanation</h3>
        <span class=" "
          >Works best for companies that offer concrete manufactured<br />
          goods, or software products.</span
        >
      </div>
    </div>
  `,
})
export class Step1TypeComponent {
  constructor(public store: OfferingStore) {}
  select(type: any) {
    this.store.update({ offeringType: type });
  }

  setProduct(type: any) {
    this.store.update({ productType: type });
  }
  buttonStyle =
    'border border-[#E3E8EF]  py-10  p-4 rounded-xl flex flex-col gap-2 items-center cursor-pointer';
}
