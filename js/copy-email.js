document.querySelectorAll(".copy-email-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const email = btn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const temp = document.createElement("textarea");
      temp.value = email;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);
    }
    const iconCopy = btn.querySelector(".icon-copy");
    const iconCheck = btn.querySelector(".icon-check");
    iconCopy.style.display = "none";
    iconCheck.style.display = "block";
    setTimeout(() => {
      iconCopy.style.display = "block";
      iconCheck.style.display = "none";
    }, 2000);
  });
});
