import { useStore } from "@tanstack/react-store";
import { Store } from "@tanstack/store";

interface SidebarState {
	isOpen: boolean;
}

// Store global para sidebar
const sidebarStore = new Store<SidebarState>({
	isOpen: false,
});

// Funções para manipular o store
export function openSidebar() {
	sidebarStore.setState((state) => ({
		...state,
		isOpen: true,
	}));
}

export function closeSidebar() {
	sidebarStore.setState((state) => ({
		...state,
		isOpen: false,
	}));
}

export function toggleSidebar() {
	sidebarStore.setState((state) => ({
		...state,
		isOpen: !state.isOpen,
	}));
}

// Hook para usar o sidebar
export function useSidebar() {
	const isOpen = useStore(sidebarStore, (state) => state.isOpen);

	return {
		isOpen,
		open: openSidebar,
		close: closeSidebar,
		toggle: toggleSidebar,
	};
}
