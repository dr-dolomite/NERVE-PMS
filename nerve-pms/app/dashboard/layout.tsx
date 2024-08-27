import { currentRole } from "@/lib/auth";

interface LayoutRoutesProps {
    children: React.ReactNode;
    doctor: React.ReactNode;
    clerk: React.ReactNode;
}

const LayoutRoutes = async ({ doctor, clerk }: LayoutRoutesProps) => {
    const role = currentRole();

    return (
        <>
            {/* console.log({role}); */}
            {await role === "DOCTOR" ? doctor : clerk}
        </>
    )
}

export default LayoutRoutes