const dotsInFiles = (name: string) => {
    let limit = 30;
    if (!!name) {
        if (name.length < limit) {
            return name;
        }
        const [folderLocation] = name.split(/\.(?=[^\.]+$)/);
        return folderLocation.slice(0, limit) + '...';
    } else {
        return '';
    }
};

export default dotsInFiles;
