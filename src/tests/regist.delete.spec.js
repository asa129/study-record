import App from "../App";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen, within, waitFor, findAllByRole} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("RegistDelete Test", () => {
	it("フォームに入力、登録ボタンを押すと記録が追加されている数が1つ増えていること", async () => {

		render(<App />);

		// 学習内容を設定する
		await userEvent.type(screen.getByTestId("studyContent"), '学習内容');
		// 時間を設定する
		await userEvent.click(screen.getByTestId("studyTime"));
		await userEvent.keyboard('10');

		// 登録ボタン押下
		await userEvent.click(await screen.findByTestId("add"));

		// 一番下の要素を取得
		const rows = await screen.findAllByRole("row");
		const lastRow = rows[rows.length - 1];
		const lastRowCells = within(lastRow).getAllByRole("cell");

		expect(lastRowCells[0].textContent).toBe("学習内容 10時間");

	});

	it("削除ボタンを押すと学習記録が削除される数が1つ減っていること", async () => {

		render(<App />);

		const before = (await screen.findAllByRole("row")).length;

		// テーブル最初の行の削除ボタン押下
		const rows = await screen.findAllByRole("row");
		const firstRow = rows[0];
		const deleteButton = within(firstRow).getByTestId("delete");
		await userEvent.click(deleteButton);

		// テーブルの行が1行削除されていること
		let after;
		await waitFor(() => {
			try{
				after = screen.getAllByRole("row").length;
			}catch{
				after = 0;
			}
			expect(after).toBe(before - 1);
		});
	});

	it("入力をしないで登録を押すとエラーが表示される", async () => {

		render(<App />);

		// 登録ボタン押下
		userEvent.click(await screen.findByTestId("add"));

		expect(await screen.findByTestId("error")).toHaveTextContent("入力されていない項目があります");
	});
});