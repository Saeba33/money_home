export const resetAllData = () => {
  localStorage.removeItem("revenues");
  localStorage.removeItem("newRevenue");
  localStorage.removeItem("savings");
  localStorage.removeItem("newSaving");
  localStorage.removeItem("expenses");
  localStorage.removeItem("newExpense");
  localStorage.removeItem("people");
  localStorage.removeItem("percentageWarning");
  window.location.reload();
};
