const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../members');

router.get('/', (req, res) => {
   res.json(members);
});

router.get('/:id', (req, res) => {
   const found = members.some(
      (member) => member.id === parseInt(req.params.id)
   );

   if (found) {
      res.json(
         members.filter((member) => member.id === parseInt(req.params.id))
      );
   } else {
      res.status(400).json({
         msg: `No Member with the id of ${req.params.id} found`,
      });
   }
});

router.post('/', (req, res) => {
   const newMembers = {
      id: uuid.v4(),
      name: req.body.name,
      email: req.body.email,
      status: 'active',
   };

   if (!newMembers.name || !newMembers.email) {
      res.status(400).json({ msg: 'Please Enter al fields' });
   } else {
      members.push(newMembers);
      res.json(members);
   }
});

router.put('/:id', (req, res) => {
   const found = members.some(
      (member) => member.id === parseInt(req.params.id)
   );

   if (found) {
      const updMember = req.body;
      members.forEach((member) => {
         if (member.id === parseInt(req.params.id)) {
            member.name = updMember.name ? updMember.name : member.name;
            member.email = updMember.email ? updMember.email : member.email;

            res.json({ msg: 'Member was updated', member });
         }
      });
   } else {
      res.status(400).json({
         msg: `No Member with the id of ${req.params.id} found`,
      });
   }
});

router.delete('/:id', (req, res) => {
   const found = members.some(
      (member) => member.id === parseInt(req.params.id)
   );

   if (found) {
      res.json({
         msg: 'Member Deleted',
         members: members.filter(
            (member) => member.id !== parseInt(req.params.id)
         ),
      });
   } else {
      res.status(400).json({
         msg: `No Member with the id of ${req.params.id} found`,
      });
   }
});

module.exports = router;
