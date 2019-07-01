require "json"

module RunTracking
  module Commands
    abstract struct BaseCommand
      property! meta : NamedTuple(user_id: Int64)?

      def with_meta(user_id)
        user_id = user_id.to_s.to_i64
        self.meta = {user_id: user_id}
        self
      end
    end
  end
end
