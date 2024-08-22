import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';

import styles from './ArticleParamsForm.module.scss';

import { useState, useRef, useEffect } from 'react';
import { OptionType, backgroundColors, contentWidthArr, fontColors, fontFamilyOptions, fontSizeOptions, defaultArticleState } from 'src/constants/articleProps';

type SelectedOptions = {
	fontType: string;
	fontSize: string;
	fontColor: string;
	backgroundColor: string;
	contentWidth: string;
};

type ArticleParamsFormProps = {
	onSubmit: (selectedOptions: SelectedOptions) => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({ onSubmit, onReset }: ArticleParamsFormProps) => {

	// Храним выбранные в форме настройки
	const [fontType, setFontType] = useState<OptionType>(defaultArticleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState<OptionType>(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState<OptionType>(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(defaultArticleState.backgroundColor);
	const [contentWidth, setContentWidth] = useState<OptionType>(defaultArticleState.contentWidth);

	// Следим засостоянием формы
	const [isOpen, setIsOpen] = useState(false);

	//Открываем/закрываем форму
	const handleOpenButtonClick = () => {
		setIsOpen(!isOpen);
	};

	//Применяем выбранные настройки при нажатии кнопки применить
	const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit({
			fontType: fontType.value,
			fontSize: fontSize.value,
			fontColor: fontColor.value,
			backgroundColor: backgroundColor.value,
			contentWidth: contentWidth.value
		});
	};

	// Сбрасываем стили на дефолтные при нажатии кнопки сбросить
	const handleReset = () => {
		setFontType(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		onReset();
	};


	//Обрабатываем клик вне формы
	const formRef = useRef<HTMLElement>(null);

	const handleClickOutOfForm = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
		  setIsOpen(false);
		}
	};

	useEffect(() => {
		if(isOpen)
			document.addEventListener('mousedown', handleClickOutOfForm);
		else
			document.removeEventListener('mousedown', handleClickOutOfForm);
		return () => {
			document.removeEventListener('mousedown', handleClickOutOfForm);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton onClick={handleOpenButtonClick} isOpen={isOpen} />
			<aside
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
				ref={formRef}
			>
				<form className={styles.form} onSubmit={handleSubmitForm}>
					<Select
						selected={fontType}
						options={fontFamilyOptions}
						onChange={setFontType}
						title="шрифт"
					/>
					<RadioGroup
						name=""
						options={fontSizeOptions}
						selected={fontSize}
						title="размер шрифта"
						onChange={setFontSize}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						onChange={setFontColor}
						title="цвет шрифта"
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						onChange={setBackgroundColor}
						title="цвет фона"
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						onChange={setContentWidth}
						title="ширина контента"
					/>
					<div className={styles.bottomContainer}>
						<Button title="Сбросить" type="reset" onClick={handleReset} />
						<Button title="Применить" type="submit" />
					</div>
				</form>
			</aside>
		</>
	);
};