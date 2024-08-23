import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {

	const [selectedOptions, setSelectedOptions] = useState({
		fontType: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value
	});

	// Применяет выбранные стили к компоненту
	const handleFormSubmit = (options: {
		fontType: string;
		fontSize: string;
		fontColor: string;
		backgroundColor: string;
		contentWidth: string;
	}) => {
		setSelectedOptions({
			fontType: options.fontType,
			fontSize: options.fontSize,
			fontColor: options.fontColor,
			backgroundColor: options.backgroundColor,
			contentWidth: options.contentWidth
		});
	};

	// Сбрасывает стили на дефолтные
	const handleResetStyles = () => {
		setSelectedOptions({
			fontType: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			fontColor: defaultArticleState.fontColor.value,
			backgroundColor: defaultArticleState.backgroundColor.value,
			contentWidth: defaultArticleState.contentWidth.value
		});
	};

	return (
		<main>
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
				<ArticleParamsForm onSubmit={handleFormSubmit} onReset={handleResetStyles} />
				<Article />
			</div>
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);