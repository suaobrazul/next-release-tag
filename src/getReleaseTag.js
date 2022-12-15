var numberFormat = new Intl.NumberFormat('pt-BR', { 
  minimumIntegerDigits: 2
})

const generateNewTagFromOld = (oldYear, oldMonth, oldDay, oldItr) => {
  const curDate = new Date();
  const curDay = numberFormat.format(curDate.getDate() + 1);
  const curMonth = numberFormat.format(curDate.getMonth() + 1);
  const curYear = curDate.getFullYear();
  console.log(oldYear, oldMonth, oldDay, oldItr)
  let newItr = oldItr + 1;
  console.log(curYear, curMonth, curDay, newItr)
  if (curMonth != oldMonth || curYear !=  oldYear || curDay != oldDay)
    newItr = 1;
  return `${curYear}-${curMonth}-${curDay}-${newItr}`;
};

const getNewReleaseTag = (oldReleaseTag) => {
  if (oldReleaseTag && (oldReleaseTag.startsWith("DEPLOY-") || oldReleaseTag.startsWith("DEV-"))){
    const [oldYear, oldMonth, oldDay, oldItr] = oldReleaseTag
      .replace("DEPLOY-","")
      .replace("DEV-","")
      .split("-")
      .map((x) => Number(x));
    return generateNewTagFromOld(oldYear, oldMonth, oldDay, oldItr);
  }
  return generateNewTagFromOld(-1, -1, -1, -1);
};

export default getNewReleaseTag;
