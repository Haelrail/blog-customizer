import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { OptionType, defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {

	// отображают выбранные пользователем стили в форме

	const [fontType, setFontType] = useState<OptionType>(defaultArticleState.fontFamilyOption);

	const [fontSize, setFontSize] = useState<OptionType>(defaultArticleState.fontSizeOption);

	const [fontColor, setFontColor] = useState<OptionType>(defaultArticleState.fontColor);

	const [backgroundColor, setBackgroundColor] = useState<OptionType>(defaultArticleState.backgroundColor);

	const [contentWidth, setContentWidth] = useState<OptionType>(defaultArticleState.contentWidth);

	// рендерит компонент с примененными пользователем стилями

	const [selectedOptions, setSelectedOptions] = useState({
		fontType: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value
	})

	// сбрасывает активные стили и "выбранные" стили в форме на дефолтные

	const resetStyles = () => {
		setFontType(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setSelectedOptions({
			fontType: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			fontColor: defaultArticleState.fontColor.value,
			backgroundColor: defaultArticleState.backgroundColor.value,
			contentWidth: defaultArticleState.contentWidth.value
		});
	}

	// применяет выбранные стили к компоненту

	const submitStyles = () => {
		setSelectedOptions({
			fontType: fontType.value,
			fontSize: fontSize.value,
			fontColor: fontColor.value,
			backgroundColor: backgroundColor.value,
			contentWidth: contentWidth.value
		})
	}

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': selectedOptions.fontType,
					'--font-size': selectedOptions.fontSize,
					'--font-color': selectedOptions.fontColor,
					'--container-width': selectedOptions.contentWidth,
					'--bg-color': selectedOptions.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm
				fontType={fontType}
				setFontType={setFontType}
				fontSize={fontSize}
				setFontSize={setFontSize}
				fontColor={fontColor}
				setFontColor={setFontColor}
				backgroundColor={backgroundColor}
				setBackgroundColor={setBackgroundColor}
				contentWidth={contentWidth}
				setContentWidth={setContentWidth}
				resetStyles={resetStyles}
				submitStyles={submitStyles}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
