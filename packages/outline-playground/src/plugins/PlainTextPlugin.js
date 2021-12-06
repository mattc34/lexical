/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import * as React from 'react';
import {useOutlineComposerContext} from 'outline-react/OutlineComposerContext';
import useOutlineEditor from 'outline-react/useOutlineEditor';
import useOutlinePlainText from 'outline-react/useOutlinePlainText';
import useOutlineDecorators from 'outline-react/useOutlineDecorators';
import ContentEditable from '../ui/ContentEditable';
import Placeholder from '../ui/Placeholder';
import useEditorListeners from '../hooks/useEditorListeners';
import {useSharedHistoryContext} from '../context/SharedHistoryContext';

function onError(e: Error): void {
  throw e;
}

export default function PlainTextPlugin({
  placeholder = 'Enter some plain text...',
}: {
  placeholder?: string,
}): React$Node {
  const [editor] = useOutlineComposerContext();
  const [rootElementRef, showPlaceholder] = useOutlineEditor(editor, onError);
  const {historyState} = useSharedHistoryContext();
  const clear = useOutlinePlainText(editor, historyState);
  const decorators = useOutlineDecorators(editor);
  const isReadOnly = useEditorListeners(clear);

  return (
    <>
      <ContentEditable
        isReadOnly={isReadOnly}
        rootElementRef={rootElementRef}
      />
      {showPlaceholder && <Placeholder>{placeholder}</Placeholder>}
      {decorators}
    </>
  );
}