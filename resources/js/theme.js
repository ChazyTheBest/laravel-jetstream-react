const Theme = Object.freeze({
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',

    docClasses: document.documentElement.classList,
    prefersDarkScheme: window.matchMedia('(prefers-color-scheme: dark)').matches,

    setToLight(setTheme) {
        return (store = true) => {
            setTheme(this.LIGHT);
            store && localStorage.setItem('theme', this.LIGHT);
            this.docClasses.contains(this.DARK) && this.docClasses.remove(this.DARK);
        };
    },

    setToDark(setTheme) {
        return (store = true) => {
            setTheme(this.DARK);
            store && localStorage.setItem('theme', this.DARK);
            !this.docClasses.contains(this.DARK) && this.docClasses.add(this.DARK);
        };
    },

    setToSystem(setTheme) {
        return (remove = true) => {
            setTheme(this.SYSTEM);
            remove && localStorage.removeItem('theme');
            this.prefersDarkScheme
                ? !this.docClasses.contains(this.DARK) && this.docClasses.add(this.DARK)
                : this.docClasses.contains(this.DARK) && this.docClasses.remove(this.DARK);
        };
    }
});

export default Theme;
