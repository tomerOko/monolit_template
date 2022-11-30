
import { wrap, wrapSync } from "../../../../utilities/function_wrapping";
import { UpdateCommunityChangablePropertiesRequest, Community, CommunityChangeableProperties } from "../../types/communities_types";
import { CommunityUtils } from "../../utilities/communities_utils";
import { CommunityLogic } from "../base_communities_logic_class";

type This = InstanceType<typeof UpdateCommunityChangeblePropertiesService>

export class UpdateCommunityChangeblePropertiesService extends CommunityLogic {

    constructor() {super()}

    public UpdateCommunityChangebleProperties = async (update_community_changable_properties_request:UpdateCommunityChangablePropertiesRequest ):Promise<void> => {
    await wrap({name:"UpdateCommunityChangeblePropertiesService/UpdateCommunityChangebleProperties"}, async()=>{
        const community_id = update_community_changable_properties_request.params.community_id;
        const community_changeable_params = update_community_changable_properties_request.body
        const community_update_properties:Partial<Community> = await this.parseChangeableProprtiesToUpdateProperties(community_changeable_params);
        await UpdateCommunityChangeblePropertiesService.community_dal.UpdateSingleCommunitybByID(community_id, community_update_properties)
    })}


    private verifiyEmailIfNeeded = async (community_changeable_params: UpdateCommunityChangablePropertiesRequest["body"]):Promise<void> => {
    await wrap({name:"UpdateCommunityChangeblePropertiesService/verifiyEmailIfNeeded"}, async()=>{
        const new_community_email = community_changeable_params.email;
        if (new_community_email)
            await CommunityUtils.validateMailNotExist(new_community_email);
    })}


    private parseChangeableProprtiesToUpdateProperties(community_changeable_params: CommunityChangeableProperties): Partial<Community>{
    return wrapSync({name: "UpdateCommunityChangeblePropertiesService/parseCangeableProprtiesToUpdateProperties"},()=>{
        const community_update_properties: Partial<Community> = { updated_at: new Date() };
        for (const [key, value] of Object.entries((community_changeable_params))) {
            if (value)
                community_update_properties[key] = value;
        }
        return community_update_properties;
    })}

}