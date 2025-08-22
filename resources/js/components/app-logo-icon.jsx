import { usePage } from '@inertiajs/react';

export default function AppLogoIcon() {
        const props = usePage().props;

        const url = props.ziggy.url;
        const favIconUrl = url + '/' + props.organization.logo;

    return (
        <img src={favIconUrl} alt={props.organization.name} {...props} />
    );
}
