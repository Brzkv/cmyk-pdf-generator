

export default class LoanInfo {

  static getLoanInfo(amount, rate, term) {

    var input = {
      amount: amount,
      rate: rate,
      term: term
    }

    var amount = (typeof (input.amount) !== "undefined" ? input.amount : 0).toString().replace(/[^\d.]/ig, ''),
      rate = (typeof (input.rate) !== "undefined" ? input.rate : 0).toString().replace(/[^\d.]/ig, ''),
      term = (typeof (input.term) !== "undefined" ? input.term : 0);

    // parse year values passed into the term value
    if (term.match("y")) {
      term = parseInt(term.replace(/[^\d.]/ig, ''), 10) * 12;
    } else {
      term = parseInt(term.replace(/[^\d.]/ig, ''), 10);
    }

    // process the input values
    var monthly_interest = rate / 100 / 12;

    // Now compute the monthly payment amount.
    var x = Math.pow(1 + monthly_interest, term),
      monthly = (amount * x * monthly_interest) / (x - 1);

    // If the result is a finite number, the user's input was good and
    // we have meaningful results to display
    if (amount * rate * term > 0) {
      // Fill in the output fields, rounding to 2 decimal places
      return {
        original_amount: amount,
        payment_amount: monthly,
        payment_amount_formatted: monthly.toFixed(2),
        num_payments: term,
        total_payments: (monthly * term),
        total_payments_formatted: (monthly * term).toFixed(2),
        total_interest: ((monthly * term) - amount),
        total_interest_formatted: ((monthly * term) - amount).toFixed(2)
      };
    } else {
      // The numbers provided won't provide good data as results,
      // so we'll return 0 so it's easy to test if one of the fields
      // is empty or invalid.
      return 0;
    }

  }

}