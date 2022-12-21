import { TypeMaterialIconName } from '@/shared/types/icon.types'

export interface IMenuItem {
	icon: TypeMaterialIconName
	link: string
	title: string
}

export interface IMenu {
	title: string
	items: IMenuItem[]
}
