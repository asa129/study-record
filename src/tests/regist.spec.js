import App from "../App";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen, fireEvent, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Regist Test", () => {
	it("フォームに入力、登録ボタンを押すと記録が追加されている数が1つ増えていること", async () => {
		// testId(title)を指定して取得
		render(<App />);

		// 学習内容と時間を設定する
		const content = screen.getByTestId("studyContent");
		const time = screen.getByTestId("studyTime");
		fireEvent.change(content, {
			target: { value: '学習内容' },
		});
		fireEvent.change(time, {
			target: { value: 10 },
		});

		// 登録ボタンイベント実行
		const registButton = screen.getByTestId("add");

		await userEvent.click(registButton);

		// 一番下の要素を取得
		const rows = screen.getAllByRole("row");
		const lastRow = rows[rows.length - 1];
		const lastRowCells = within(lastRow).getAllByRole("cell");


		expect(lastRowCells[0].textContent).toBe("学習内容 10時間");

	});
});
