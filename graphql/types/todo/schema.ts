import { objectType } from 'nexus';

export const Todo = objectType({
	name: 'Todo',
	definition(t) {
		t.string('id');
		t.string('title');
		t.string('description');
		t.boolean('status');
		t.string('user_id');

		t.field('createdAt', {
			type: 'String',
			//@ts-ignore
			resolve: parent => new Date(parent?.createdAt).toLocaleDateString(),
		});

		t.field('updatedAt', {
			type: 'String',
      //@ts-ignore
			resolve: parent => new Date(parent?.updatedAt).toLocaleDateString(),
		});
	},
});
