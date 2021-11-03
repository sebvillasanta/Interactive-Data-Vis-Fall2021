owidCO2Data <- read.csv("~/Documents/Repositories/Interactive-Data-Vis-Fall2021/data/owidCO2Data.csv")

UN_Population_for_Tableau <- read_excel("Library/Mobile Documents/com~apple~CloudDocs/Documents/My Tableau Repository/Datasources/Lab 5/UN Population for Tableau.xlsx")

library(dplyr)
library(ggplot2)

owidCO2data2019 <- filter(owidCO2Data, year == 2019)

df = owidCO2data2019 %>% inner_join(UN_Population_for_Tableau,by="country")

write.csv(df, "owidCO2Data2019merged")