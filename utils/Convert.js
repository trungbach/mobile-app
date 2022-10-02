import userApi from "../components/api/userApi";
import { unwrapResult, createAsyncThunk } from "@reduxjs/toolkit";
export const Convert = {
	/**
	 * Convert object to query string
	 * @param {*} obj obj query
	 * @returns query string
	 * @author: PVTRONG (17/4/2022)
	 */
	objectToQueryString(obj) {
		var str = [];
		for (var p in obj)
			if (obj.hasOwnProperty(p) && obj[p] !== null) {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
		return str.join("&");
	},

	async saveFieldProfile(fieldName, value, userId) {
		try {
			var objectParam = {};
			objectParam[fieldName] = value;
			var res = await userApi.updateProfile(userId, objectParam);
			if (res.hasOwnProperty("email")) return unwrapResult({ user: res });
			else return false;
		} catch (err) {
			console.log(err);
		}
	},

	formatDatetime(t) {
        t = new Date(t)
		const date = ("0" + t.getDate()).slice(-2);
		const month = ("0" + (t.getMonth() + 1)).slice(-2);
		const year = t.getFullYear();
		const hours = ("0" + t.getHours()).slice(-2);
		const minutes = ("0" + t.getMinutes()).slice(-2);
		const seconds = ("0" + t.getSeconds()).slice(-2);
		return `${month}/${date}/${year}`;
	},
};
