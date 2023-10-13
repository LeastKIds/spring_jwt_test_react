import {PathEnum} from "../../enum/path/PathEnum";
import React from "react";

export interface AuthGuard {
    path: PathEnum;
    children: React.ReactNode;
}