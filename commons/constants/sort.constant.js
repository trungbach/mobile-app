import { SortEnum } from "../enums/sort.enum"
export const SortTextConstant = [
    // Thời gian tăng dần
    {
        name: "Time: create the earliest",
        enum: SortEnum.TimeAsc,
        active: true
    },

    // Thời gian giảm dần
    {
        name: "Time: create at the latest",
        enum: SortEnum.TimeDes
    },

    // Giá tăng dần
    {
        name: "Price: ascending",
        enum: SortEnum.PriceAsc
    },

    // Giá giảm dần
    {
        name: "Price: descending",
        enum: SortEnum.PriceDes
    }
]