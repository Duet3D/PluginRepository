<template>
  <div
    data-v-2bf6d1b3=""
    class="row pt-5 align-items-center justify-content-center"
  >
    <div data-v-2bf6d1b3="" class="mb-2 col-md-4" align="left">
      <img
        data-v-2bf6d1b3=""
        src="data:image/png;base64,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"
        class=""
      />
    </div>
    <div data-v-2bf6d1b3="" class="col" align="right">
      <div data-v-2bf6d1b3="" class="container">
        <div data-v-2bf6d1b3="" class="row justify-content-end">
          <div data-v-2bf6d1b3="" class="col-md">
            <a
              href="/page/delivery-information"
              class="btn text-light px-0 btn-link btn-sm"
              target="_self"
              data-v-2bf6d1b3=""
            >
              DELIVERY INFORMATION
            </a>
          </div>
          <div data-v-2bf6d1b3="" class="col-md-auto">
            <a
              href="/page/privacy-policy/#"
              class="btn text-light px-0 btn-link btn-sm"
              target="_self"
              data-v-2bf6d1b3=""
            >
              PRIVACY POLICY
            </a>
          </div>
          <div data-v-2bf6d1b3="" class="col-md-auto">
            <a
              href="/page/terms-conditions"
              class="btn text-light px-0 btn-link btn-sm"
              target="_self"
              data-v-2bf6d1b3=""
            >
              TCS
            </a>
          </div>
          <div data-v-2bf6d1b3="" class="col-md-auto">
            <a
              href="/page/genuine-resellers"
              class="btn text-light px-0 btn-link btn-sm"
              target="_self"
              data-v-2bf6d1b3=""
            >
              GENUINE RESELLERS
            </a>
          </div>
          <div data-v-2bf6d1b3="" class="col-md-auto">
            <a
              href="/page/contact-us"
              class="btn text-light px-0 btn-link btn-sm"
              target="_self"
              data-v-2bf6d1b3=""
            >
              CONTACT US
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">

</style>