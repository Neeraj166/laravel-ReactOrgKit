import { Head, usePage } from '@inertiajs/react';

const AppHead = ({ title, children }) => {
    const props = usePage().props;
    const appName = props.organization.name;
    const url = props.ziggy.url;
    const favIconUrl = url + '/' + props.organization.favicon;

    return (
        <Head>
            <title>{`${title} - ${appName}`}</title>
            {children}
            <link rel="icon" type="image/svg+xml" href={favIconUrl} />
        </Head>
    );
};

export default AppHead;
