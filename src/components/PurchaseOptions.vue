<script setup>
import Formatter from '../helpers/formatter';
import PurchaseOption from './PurchaseOption.vue';

const props = defineProps({
  data: Object,
});

const client_price = props.data.client_price;

function formatPrice(number) {
  return Formatter.usd(number);
}
function purchase() {
  var firstPayment = client_price * 0.3;
  var secondPayment = client_price * 0.5;
  var lastPayment = client_price * 0.2;
  var total = firstPayment + secondPayment + lastPayment;

  return [firstPayment, secondPayment, lastPayment, total];
}
function lease() {
  var price = client_price;
  var downpayment = client_price * 0.2;
  var term = 36;
  var rate = 6.5;

  var monthly_interest = rate / 100 / 12;
  var x = Math.pow(1 + monthly_interest, term);
  var monthly = (price * x * monthly_interest) / (x - 1);

  var interest = monthly * term;
  var buyout = interest - price;

  return [price, downpayment, term, buyout, monthly];
}
function finance() {
  var price = client_price;
  var term = 36;
  var rate = 8.99;

  var monthly_interest = rate / 100 / 12;
  var x = Math.pow(1 + monthly_interest, term);
  var monthly = (price * x * monthly_interest) / (x - 1);

  var interest = monthly * term - price;
  var total = price + interest;

  return { price: price, term: term, rate: rate, interest: interest, total: total, monthly: monthly };
}
</script>

<template>
  <div class="mb-8">
    <div class="fw-bold mb-8">Pricing and available purchase options</div>
    <div class="row column-gap-6">
      <!-- Purchase -->
      <PurchaseOption
        bg="cyan"
        title="Purchase"
        titleSup="1"
        subtitle="Get your printer in 75 days with no overpayment."
      >
        <div class="row fs-8 lh-12 pb-4 border-light border-bottom">
          <div class="col-8">
            <div>
              <div>First payment (30%)</div>
              <div class="grey">Prepayment</div>
            </div>
          </div>
          <div class="col-4">
            <div class="text-right">
              {{ formatPrice(purchase()[0]) }}
            </div>
          </div>
        </div>
        <div class="row fs-8 lh-12 pb-4 pt-4 border-light border-bottom">
          <div class="col-8">
            <div>
              <div>Second payment (50%)</div>
              <div class="grey">After 45 days</div>
            </div>
          </div>
          <div class="col-4">
            <div class="text-right">
              {{ formatPrice(purchase()[1]) }}
            </div>
          </div>
        </div>
        <div class="row fs-8 lh-12 pb-4 pt-4 border-light border-bottom">
          <div class="col-8">
            <div>
              <div>Final payment (20%)</div>
              <div class="grey">After delivery and installing</div>
            </div>
          </div>
          <div class="col-4">
            <div class="text-right">
              {{ formatPrice(purchase()[2]) }}
            </div>
          </div>
        </div>
        <div class="row fs-9 lh-12 fw-bold pt-6">
          <div class="col-8">
            <div class="">Total</div>
          </div>
          <div class="col-4">
            <div class="text-right">
              {{ formatPrice(client_price) }}
            </div>
          </div>
        </div>
      </PurchaseOption>

      <!-- Lease -->
      <PurchaseOption
        title="Lease to own"
        titleSup="2"
        bg="magenta"
        subtitle="Use our printer for three years with the right to buyout it at the end of the leasing period."
      >
        <div class="row fs-8 lh-12 pb-4 border-light border-bottom">
          <div class="col-8">
            <div>Printer price</div>
          </div>
          <div class="col-4">
            <div class="text-right">
              {{ formatPrice(lease()[0]) }}
            </div>
          </div>
        </div>
        <div class="row fs-8 lh-12 pb-4 pt-4 border-light border-bottom">
          <div class="col-8">
            <div>Downpayment</div>
          </div>
          <div class="col-4">
            <div class="text-right">
              {{ formatPrice(lease()[1]) }}
            </div>
          </div>
        </div>
        <div class="row fs-8 lh-12 pb-4 pt-4 border-light border-bottom">
          <div class="col-8">
            <div>Lease term</div>
          </div>
          <div class="col-4">
            <div class="text-right">
              {{ lease()[2] }}
            </div>
          </div>
        </div>
        <div class="row fs-8 lh-12 pb-4 pt-4 border-light border-bottom">
          <div class="col-8">
            <div>Buyout</div>
          </div>
          <div class="col-4">
            <div class="text-right">
              {{ formatPrice(lease()[3]) }}
            </div>
          </div>
        </div>
        <div class="row fs-9 lh-12 fw-bold pt-6">
          <div class="col-8">
            <div class="">Monthly payment</div>
          </div>
          <div class="col-4">
            <div class="text-right">
              {{ formatPrice(lease()[4]) }}
            </div>
          </div>
        </div>
      </PurchaseOption>

      <!-- Finance -->
      <PurchaseOption
        bg="black"
        title="Financing"
        titleSup="3"
        subtitle="Enjoy a 6 month runway before full payments begin."
      >
        <div class="row fs-8 lh-12 pb-4 border-light border-bottom">
          <div class="col-8">
            <div>Printer price</div>
          </div>
          <div class="col-4">
            <div class="text-right">
              {{ formatPrice(client_price) }}
            </div>
          </div>
        </div>
        <div class="row fs-8 lh-12 pb-4 pt-4 border-light border-bottom">
          <div class="col-8">
            <div>Rate</div>
          </div>
          <div class="col-4">
            <div class="text-right">
              {{ finance()['rate'] }}
            </div>
          </div>
        </div>
        <div class="row fs-8 lh-12 pb-4 pt-4 border-light border-bottom">
          <div class="col-8">
            <div>Terms</div>
          </div>
          <div class="col-4">
            <div class="text-right">
              {{ finance()['term'] }}
            </div>
          </div>
        </div>
        <div class="row fs-8 lh-12 pb-4 pt-4 border-light border-bottom">
          <div class="col-8">
            <div>Interest</div>
          </div>
          <div class="col-4">
            <div class="text-right">
              {{ formatPrice(finance()['interest']) }}
            </div>
          </div>
        </div>
        <div class="row fs-8 lh-12 pb-4 pt-4 border-light border-bottom">
          <div class="col-8">
            <div>Total</div>
          </div>
          <div class="col-4">
            <div class="text-right">
              {{ formatPrice(finance()['total']) }}
            </div>
          </div>
        </div>
        <div class="row fs-9 lh-12 fw-bold pt-6">
          <div class="col-8">
            <div class="">Monthly payment</div>
          </div>
          <div class="col-4">
            <div class="text-right">
              {{ formatPrice(finance()['monthly']) }}
            </div>
          </div>
        </div>
      </PurchaseOption>
    </div>
  </div>
</template>

<style scoped></style>
