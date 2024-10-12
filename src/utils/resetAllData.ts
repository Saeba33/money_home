export const resetAllData = () => {
  localStorage.removeItem("income");
  localStorage.removeItem("newIncome");
  localStorage.removeItem("savings");
  localStorage.removeItem("newSaving");
  localStorage.removeItem("expenses");
  localStorage.removeItem("newExpense");
  localStorage.removeItem("people");
  localStorage.removeItem("percentageWarning");
  localStorage.removeItem("distributionMode");
  window.location.reload();
};
