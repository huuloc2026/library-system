"use client";

import { Card } from "antd";

const { Meta } = Card;

interface BookCardProps {
  title: string;
  author: string;
  coverImage: string;
}

export default function BookCard({ title, author, coverImage }: BookCardProps) {
  return (
    <Card
      hoverable
      cover={<img alt={title} src={coverImage} className="h-64 object-cover" />}
      className="w-full"
    >
      <Meta title={title} description={author} />
    </Card>
  );
}
