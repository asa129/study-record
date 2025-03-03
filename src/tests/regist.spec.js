import App from "../App";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen, within, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Regist Test", () => {
	it("フォームに入力、登録ボタンを押すと記録が追加されている数が1つ増えていること", async () => {
		// testId(title)を指定して取得
		render(<App />);

		// 学習内容を設定する
		await userEvent.type(screen.getByTestId("studyContent"), '学習内容');
		// 時間を設定する
		await userEvent.click(screen.getByTestId("studyTime"));
		await userEvent.keyboard('10');

		// 登録ボタン押下
		const registButton = screen.getByTestId("add");
		await userEvent.click(registButton);

		テーブルの行を取得できるまで待つ
		await waitFor(() => {
			screen.getAllByRole("row");
		});

		// 一番下の要素を取得
		const rows = screen.getAllByRole("row");
		const lastRow = rows[rows.length - 1];
		const lastRowCells = within(lastRow).getAllByRole("cell");

		expect(lastRowCells[0].textContent).toBe("学習内容 10時間");

	});
});
