import ClientLayoutTemplate from '@/layouts/client/client-header-layout';
import Site  from '../components/app-head';

export default ({ children, breadcrumbs, ...props }) => (
    <ClientLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <Site title="hsdf"/>
        {children}
    </ClientLayoutTemplate>
);
