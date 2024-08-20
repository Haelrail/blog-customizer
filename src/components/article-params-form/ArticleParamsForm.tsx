import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';

import styles from './ArticleParamsForm.module.scss';

import { Dispatch, SetStateAction, useState, useRef, useEffect } from 'react';
import { OptionType, backgroundColors, contentWidthArr, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';

type ArticleData = {
	fontType: OptionType;
	setFontType: Dispatch<SetStateAction<OptionType>>;

	fontSize: OptionType;
	setFontSize: Dispatch<SetStateAction<OptionType>>;

	fontColor: OptionType;
	setFontColor: Dispatch<SetStateAction<OptionType>>;

	backgroundColor: OptionType;
	setBackgroundColor: Dispatch<SetStateAction<OptionType>>;

	contentWidth: OptionType;
	setContentWidth: Dispatch<SetStateAction<OptionType>>;

	resetStyles: () => void;

	submitStyles: () => void;
}

export const ArticleParamsForm = (props: ArticleData) => {

	const [isOpen, setIsOpen] = useState(false);

	const  handleOpenButtonClick = () => {
		setIsOpen(!isOpen);
		console.log("Current isOpen:", isOpen);
	};

	const handleFontTypeSelection = (selectedFontType: OptionType) => {
		props.setFontType(selectedFontType);
	};

	const handleFontSizeSelection = (selectedFontSize: OptionType) => {
		props.setFontSize(selectedFontSize);
	};

	const handleFontColorSelection = (selectedFontColor: OptionType) => {
		props.setFontColor(selectedFontColor)
	};

	const handleBackgroundColorSelection = (selectedBackgroundColor: OptionType) => {
		props.setBackgroundColor(selectedBackgroundColor)
	};

	const handleContentWidthSelection = (selectedContentWidth: OptionType) => {
		props.setContentWidth(selectedContentWidth)
	};

	const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		props.submitStyles();
	};

	// закрытие при клике вне формы

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
			document.removeEventListener('mousedown', handleClickOutOfForm)
		return () => {
			document.removeEventListener('mousedown', handleClickOutOfForm);
			};
	}, [isOpen]);

	return (
		<>
			<ArrowButton onClick={handleOpenButtonClick}  isOpen={isOpen}/>
			<aside
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
				ref={formRef}
			>
				<form className={styles.form} onSubmit={handleSubmitForm}>
					<Select
						selected = {props.fontType}
						options = {fontFamilyOptions}
						onChange = {handleFontTypeSelection}
						title='шрифт'
					/>
					<RadioGroup
						name=''
						options={fontSizeOptions}
						selected={props.fontSize}
						title='размер шрифта'
						onChange={handleFontSizeSelection}
					/>
					<Select
						selected={props.fontColor}
						options={fontColors}
						onChange={handleFontColorSelection}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={props.backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorSelection}
						title='цвет фона'
					/>
					<Select
						selected={props.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthSelection}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={props.resetStyles}/>
						<Button title='Применить' type='submit'/>
					</div>
				</form>
			</aside>
		</>
	);
};
