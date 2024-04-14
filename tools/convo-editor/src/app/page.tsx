'use client';

import { Convo } from "@/lib/convo";
import { useState } from "react";
import LoaderView from "./loader/page";
import ManagerView from "./manager/page";
import EditorView from "./editor/page";

export default function Main() {

  const [convoData, updateData] = useState<Convo.ConvoData>();

  const [themeId, setTheme] = useState<string>();
  
  const loadConvo = async (data?: Convo.ConvoData) => {
    updateData(data);
  }

  const resetData = async () => {
    updateData(undefined);
  }

  return (
    <main>
      <ManagerView data={convoData} />
      {(convoData) ? <EditorView convoData={convoData} onEditorClose={resetData} /> : <LoaderView onConvoLoad={loadConvo} />}
    </main>
  );
}
