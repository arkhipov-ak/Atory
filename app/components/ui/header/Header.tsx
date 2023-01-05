import cn from 'clsx'
import { getAuthorUrl } from 'config/url.config'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { HiOutlinePencil } from 'react-icons/hi'
import { FormattedMessage } from 'react-intl'

import t from '@/hooks/getLang'

import { IAuthor } from '@/shared/types/track.types'

import MaterialIcon from '../MaterialIcon'
import Button from '../button/Button'
import Field from '../form-elements/Field'
import UploadField from '../form-elements/UploadField/UploadFields'
import Navigation from '../navigation/Navigation'

import styles from './Header.module.scss'

interface IHeader {
	subtitle: string
	title: string
	description: string
	poster?: string | StaticImageData
	author?: IAuthor[]
	isEdit?: boolean
	useFunc?: any
	id?: string
}

const Header: FC<IHeader> = ({
	subtitle,
	title,
	description,
	poster,
	author,
	isEdit = false,
	useFunc,
	id,
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const data = useFunc && useFunc(setIsOpen, id)

	const { handleSubmit, register, control } = useForm({
		mode: 'onChange',
	})

	const handleIsOpen = () => {
		if (isEdit) {
			setIsOpen(!isOpen)
		}
	}
	return (
		<>
			<div
				className={cn(styles.header, {
					'cursor-pointer': isEdit,
				})}
				onClick={handleIsOpen}
			>
				<div
					className={cn(styles.avatar, {
						[styles.avatarAuth]: isEdit,
					})}
				>
					{poster ? (
						<Image
							src={poster}
							draggable={false}
							alt="Avatar"
							layout="fill"
							priority
							objectFit="cover"
						/>
					) : (
						<MaterialIcon name="MdPersonOutline" />
					)}
					{isEdit && (
						<>
							<div className={styles.shadow}></div>
							<div className={styles.edit}>
								<HiOutlinePencil />
								<p>
									<FormattedMessage id="Select photo" />
								</p>
							</div>
						</>
					)}
				</div>
				<div className={styles.info}>
					<p>{t(subtitle)}</p>
					<h1>{title}</h1>
					<p>
						{author &&
							author.map((author) => (
								<Link href={getAuthorUrl(author.slug)} key={author._id}>
									<Image
										src={author.poster}
										width={25}
										height={25}
										alt="Author photo"
										draggable={false}
									/>
									{author.title}
								</Link>
							))}
					 <span>{description}</span>	
					</p>
				</div>
			</div>
			<div
				className={cn(styles.modal, { '!block': isOpen })}
				onClick={handleIsOpen}
			>
				<div onClick={(e) => e.stopPropagation()}>
					<div>
						<p>{t('Profile data')}</p>
						<span onClick={handleIsOpen}>
							<MaterialIcon name="MdClose" />
						</span>
					</div>
					<form onSubmit={handleSubmit(data?.onSubmit)}>
						<Controller
							control={control}
							name="poster"
							defaultValue={poster ? poster : ''}
							render={({ field: { value, onChange } }) => (
								<UploadField
									onChange={onChange}
									value={value ? value : poster}
									folder="profile"
								/>
							)}
						/>
						<div>
							<Field
								placeholder="Add display name"
								text="Name"
								{...register('name')}
							/>
							<Button text="Save" label='Save' />
						</div>
					</form>
				</div>
			</div>
			<div className={styles.settings}>
				{isEdit && (
					<Navigation
						isEdit={isEdit}
						openModal={setIsOpen}
						id={id}
						handleDelete={data.deleteAsync}
					/>
				)}
			</div>
		</>
	)
}
export default Header
