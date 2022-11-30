
import { wrap, wrapSync } from "../../../../utilities/function_wrapping";
import { UpdatePostChangablePropertiesRequest, Post, PostChangeableProperties } from "../../types/posts_types";
import { PostUtils } from "../../utilities/posts_utils";
import { PostLogic } from "../base_posts_logic_class";

type This = InstanceType<typeof UpdatePostChangeblePropertiesService>

export class UpdatePostChangeblePropertiesService extends PostLogic {

    constructor() {super()}

    public UpdatePostChangebleProperties = async (update_post_changable_properties_request:UpdatePostChangablePropertiesRequest ):Promise<void> => {
    await wrap({name:"UpdatePostChangeblePropertiesService/UpdatePostChangebleProperties"}, async()=>{
        const post_id = update_post_changable_properties_request.params.post_id;
        const post_changeable_params = update_post_changable_properties_request.body
        const post_update_properties:Partial<Post> = await this.parseChangeableProprtiesToUpdateProperties(post_changeable_params);
        await UpdatePostChangeblePropertiesService.post_dal.UpdateSinglePostbByID(post_id, post_update_properties)
    })}


    private verifiyEmailIfNeeded = async (post_changeable_params: UpdatePostChangablePropertiesRequest["body"]):Promise<void> => {
    await wrap({name:"UpdatePostChangeblePropertiesService/verifiyEmailIfNeeded"}, async()=>{
        const new_post_email = post_changeable_params.email;
        if (new_post_email)
            await PostUtils.validateMailNotExist(new_post_email);
    })}


    private parseChangeableProprtiesToUpdateProperties(post_changeable_params: PostChangeableProperties): Partial<Post>{
    return wrapSync({name: "UpdatePostChangeblePropertiesService/parseCangeableProprtiesToUpdateProperties"},()=>{
        const post_update_properties: Partial<Post> = { updated_at: new Date() };
        for (const [key, value] of Object.entries((post_changeable_params))) {
            if (value)
                post_update_properties[key] = value;
        }
        return post_update_properties;
    })}

}