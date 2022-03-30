export default function formatCurrency(num) {
  console.log("number issue", num);
  return "$" + Number(num.toFixed(1)).toLocaleString();
}
