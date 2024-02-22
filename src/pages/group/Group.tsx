import { useContext, useEffect, useState } from "react";
import useFetch from "../../utils/custom-hooks/useFetch";
import { useParams } from "react-router-dom";
import ConnectedContext from "../../ConnectedContext";
import GroupInfos from "./group-infos/GroupInfos";
import GroupSettings from "./group-settings/GroupSettings";
import MembershipRequests from "./membership-requests/MembershipRequests";
import BannedMembers from "./banned-members/BannedMembers";
import MutedMembers from "./muted-members/MutedMembers";
import Role from "./role/Role";
import "./GroupStyle.css";

// Assuming the connectedUser object has an id property
type ConnectedUser = {
    id: string;
};

const Group: React.FC = () => {
    const [userType, setUserType] = useState('');
    const [data, setData] = useState<any>({});
    const {id} = useParams(); // id of group
    const { connectedUser } = useContext(ConnectedContext);
    const user_id = connectedUser?.id;
    
    const {loading, error, value} : {
        loading: boolean;
        error: any;
        value: any;
    } = useFetch(`http://localhost:3001/room/${user_id}/${id}`, {}, [id]);
    
    useEffect(() => {
            if (value) {
            if (user_id === value?.owner[0]?.id) {
                setUserType('owner');
            } else if (value?.admins.find((admin: any) => admin.id === user_id)) {
                setUserType('admin');
            } else if (value?.members.find((member: any) => member.id === user_id)) {
                setUserType('member');
            } else {
                setUserType('visitor');
            }
            setData(value);
            }
    }, [value]);
    
    useEffect(() => {
    // Add your side effect logic here
    }, [data]);

        if (loading) {return <div>Future is Loading...</div>}
        
        return  (<section className="group" data-group-type="protected">
                <div className="container">
                    <div className="group-content" data-status="online">
                    <GroupInfos
                        groupInfos={{
                            id: id || '', // TODO: more checks, kan ghi id
                            name: data?.name,
                            type: data?.type,
                            userType: userType,
                            banned_members: data?.banned_members,
                            muted_members: data?.muted_members
                        }}

                        members_requests={data?.members_requests}
                    />
                    {data?.type === "protected"}
                    {/* HERE TEST FOR THE CONNECTED USER ID IF HE IS THE OWNER OF THE GROUP  OR HIS NAME IS ON THE LIST OF ADMINS ARRAY, THEN SHOW THE GROUPS SETTINGS AND MEMBERSHIP REQUEST COMPONENTS FOR HIM   */}
                    {((userType === "owner" || userType === "admin") && !data?.banned_members?.some((member: any) => member.id === user_id)) && (
                        <>
                        <GroupSettings
                            componentFor='edit'
                            members={data?.members?.map((member: any) => ({text: member.name, id: member.id}))}
                            admins={data?.admins?.map((admin: any) => ({text: admin.name, id: admin.id}))}
                            groupInfos={{
                                id: id,
                                name: data?.name,
                                type: data?.type,
                                }}
                            setData={setData}
                            
                        />
                        {data?.type === 'private' && <MembershipRequests data={{members_requests: data?.members_requests, group_id: id}} setData={setData} />}
                        <BannedMembers data={{banned_members: data?.banned_members, group_id: id}} setData={setData} />
                        <MutedMembers data={{muted_members : data?.muted_members, group_id: id}} />
                        </>
                    )}

                    <Role data={{ group_id: id,type: "owner", infos: data?.owner, userType: userType, friends_list: data?.friends_list } } setData={setData} />
                    {/* <Role data={{ group_id: id,type: "admins", infos: data?.admins, userType: userType } }setData={setData} /> */}
                    <Role data={{ group_id: id,type: "admins", infos: data?.admins?.filter((admin: any) => !data?.muted_members?.some((member: any) => member.id === admin.id) && !data?.banned_members?.some((member: any) => member.id === admin.id)), userType: userType, friends_list: data?.friends_list } }setData={setData} />
                    <Role data={{ group_id: id,type: "members", infos: data?.members, userType: userType, friends_list: data?.friends_list } } setData={setData} />
                    </div>
                </div>
                </section>)
        
    
};

export default Group;
