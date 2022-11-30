import { CommunityDAL } from "../dal/communities_dal";
import {community_helpers} from './helpers/communities_helpers_index'

export class CommunityLogic{
    constructor(){}
    static community_dal = new CommunityDAL();
    static community_helper = community_helpers
}