import I18n from "../languages/i18n";

export const monthGenerator = (date: string) => {
  const month = parseInt(date.split("-")[1]);
  const year = parseInt(date.split("-")[0]);
  const day = parseInt(date.split("-")[2]);
  switch (month) {
    case 1:
      return `${day} ${I18n.t("january")} ${year} `;
    case 2:
      return `${day} ${I18n.t("months.february")} ${year} `;
    case 3:
      return `${day} ${I18n.t("months.march")} ${year} `;
    case 4:
      return `${day} ${I18n.t("months.april")} ${year} `;
    case 5:
      return `${day} ${I18n.t("months.may")}May ${year} `;
    case 6:
      return `${day} ${I18n.t("months.june")} ${year} `;
    case 7:
      return `${day} ${I18n.t("months.july")} ${year} `;
    case 8:
      return `${day} ${I18n.t("months.august")} ${year} `;
    case 9:
      return `${day} ${I18n.t("months.september")} ${year} `;
    case 10:
      return `${day} ${I18n.t("months.october")} ${year} `;
    case 11:
      return `${day} ${I18n.t("months.november")} ${year} `;
    case 12:
      return `${day} ${I18n.t("months.december")} ${year} `;
  }
};
